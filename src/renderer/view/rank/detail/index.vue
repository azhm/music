<template>
    <div :class="s.app">
        <div :class="s.top">
            <img :src="info.cover | image('netease', 160)"/>
            <div :class="s.right">
                <span :class="s.name">{{info.name}}</span>
                <p style="font-size: 12px">{{info.description}}</p>
                <a :class="s.play" @click="doPlay(info.list[0])">立即播放</a>
                <span :class="s.total">累计播放：{{info.playCount}}</span>
            </div>
        </div>
        <DataTable :data="info.list"
                   :class="s.table"
                   :showVendor="false"
        ></DataTable>
    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" module="s">
    .app {
        .top {
            display: flex;
            background-color: #FAFAFA;
            padding: 26px;
            $imgWidth: 135px;
            & > img {
                width: $imgWidth;
                height: $imgWidth;
            }
            .right {
                display: flex;
                flex-direction: column;
                padding-left: 16px;
                width: calc(100% - #{$imgWidth});
                position: relative;
                .name {
                    font-size: 22px;
                    font-weight: bold;
                }
                .play {
                    position: absolute;
                    bottom: 2px;
                    left: 16px;
                    cursor: pointer;
                    display: flex;
                    width: 100px;
                    height: 22px;
                    justify-content: center;
                    align-items: center;
                    border-radius: 4px;
                    font-size: 14px;
                    background-color: #67C23A;
                    color: white;
                    transition: all .2s;
                    &:hover {
                        transition: all .2s;
                        opacity: .8;
                    }
                }
                .total {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 12px;
                    color: gray;
                }
            }
        }
        .table {
            width: 100%;
            padding: 0 24px;
            overflow-x: hidden;
            .row {
                &:hover {
                    .songControl {
                        display: inline-flex;
                        align-items: center;
                    }
                }
                &.disabled {
                    opacity: .6;
                }
            }
            .nameItem {
                display: flex;
                .songName {
                    width: 160px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-left: 4px;
                }
                .songControl {
                    display: none;
                    width: 60px;
                    svg {
                        margin-left: 6px;
                        cursor: pointer;
                    }
                }
            }
            .singer {
                :global {
                    .cell {
                        @include text-ellipsis;
                    }
                }
            }
            .album {
                display: block;
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            :global {
                .el-table__body-wrapper {
                    overflow-x: hidden;
                }
            }
            .link {
                color: $color-table-text;
                transition: color .2s;
                text-decoration: none;
                &:hover {
                    transition: color .2s;
                    color: $color-primary;
                }
            }
        }
    }
</style>