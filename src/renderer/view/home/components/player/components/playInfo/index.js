import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      timer: null,
      duration: {
        cur: 0,
        total: 0
      },
      modal: false
    }
  },
  computed: {
    ...mapState('api', ['play']),
    ...mapState('user', ['info']),
    ...mapState('c_playlist', ['playlist']),
    ...mapState('lyrics', ['show']),
    percentage () {
      return this.duration.total ? (this.duration.cur / this.duration.total) * 100 : 0
    }
  },
  watch: {
    'play.pause' (val) {
      window.clearInterval(this.timer)
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (val) {
          audio.pause()
        } else {
          audio.play()
          this.timer = window.setInterval(() => {
            this.duration = {
              cur: audio.currentTime,
              total: audio.duration
            }
            if (audio.ended) {
              this.$store.dispatch('c_playlist/next')
            }
            this.$store.commit('api/updatePlay', {
              time: Math.floor(audio.currentTime * 1000)
            })
          }, 500)
        }
      })
    },
    'play.info' () {
      this.duration = {
        cur: 0,
        total: 0
      }
    },
    'play.volume' (val) {
      if (this.$refs.audio) {
        this.$refs.audio.volume = val / 100
      }
    }
  },
  filters: {
    defaultAlbum (val) {
      return val ? val.album.coverSmall : require('../../images/defaultAlbum.png')
    },
    minute (val) {
      return moment(val * 1000).format('mm:ss')
    }
  },
  methods: {
    async collect (id) {
      try {
        await this.$http.post(`/playlist/${id}`, {
          id: this.play.info.id,
          vendor: this.play.info.source,
          sourceData: this.play.info
        })
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      } catch (e) {
        console.warn(e)
        this.$message({
          message: e.data.msg,
          type: 'warning'
        })
      }
    },
    toggleLyrics () {
      this.$store.commit('lyrics/update', {
        show: !this.show
      })
    }
  }
}
