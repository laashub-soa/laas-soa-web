<template>
  <div>
    <router-view/>
    <ExternalEmbedOperate
      :directory_id=directory_id
      :directory_name=directory_name
      :data_id=data_data_id
      :is_cache_2_local=is_cache_2_local
      ref="external_embed_operate"
    ></ExternalEmbedOperate>

    <i-button type="primary" long @click="build_project">提交</i-button>
  </div>

</template>

<script>
    /**
     * 项目构建, 任意git服务器, 任意仓库, 任意数量的分支/tag
     * 目前场景下需要支持的是多分支自动合并成tag, 以及构建tag
     * 该tag需要供流程组优先使用
     *
     */
    import executor from '@/views/operate/executor/executor.js'
    import ExternalEmbedOperate from "@/views/operate/operate/ExternalEmbedOperate";

    export default {
        name: "ProjectBuild",
        components: {
            ExternalEmbedOperate,
        },
        data() {
            return {
                directory_id: 7,
                directory_name: "",
                data_data_id: null,
                is_cache_2_local: true,
            }
        },
        methods: {
            async build_project() { // 构建项目
                // 保存动作数据
                this.data_data_id = await this.$refs.external_embed_operate.change_data_data();
                // 触发动作
                await executor.execute_business("build_project", this.directory_id, this.data_data_id);
            },
            // async commit() { // 提交
            //     this.data_id = await this.$refs.external_embed_operate.change_data_data();
            //     await this.$refs.workflow_wrapper.create_workflow("develop_project_requirements", "研发项目需求", this.data_id);
            // }
        },
    }
</script>
<style>
  @import '~view-design/dist/styles/iview.css';

  .ivu-split-trigger-vertical {
    width: 2px;
    background: #d6d6d6;
  }

  .ivu-split-trigger {
    border: 0px;
  }

  .ivu-tabs-bar {
    margin-bottom: 1px;
  }

  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0 0px;
  }

  .ivu-breadcrumb {
    font-size: 22px;
    float: left;
  }

  .ivu-menu-horizontal {
    height: 30px;
    line-height: 30px;
  }
</style>
