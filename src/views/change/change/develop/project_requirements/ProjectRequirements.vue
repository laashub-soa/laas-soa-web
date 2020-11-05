<template>
  <div>
    <router-view/>
    <WorkflowWrapper ref="workflow_wrapper"></WorkflowWrapper>
    <ExternalEmbedOperate
      :directory_id=directory_id
      :directory_name=directory_name
      :data_id=data_id
      ref="external_embed_operate"
    ></ExternalEmbedOperate>

    <i-button type="primary" long @click="commit">提交</i-button>
  </div>

</template>

<script>
    import ExternalEmbedOperate from "@/views/operate/operate/ExternalEmbedOperate";
    import WorkflowWrapper from "@/views/change/workflow/Wrapper";

    export default {
        name: "ProjectRequirements",
        components: {
            ExternalEmbedOperate,
            WorkflowWrapper,
        },
        data() {
            return {
                directory_id: 10,
                directory_name: "",
                data_id: null,
            }
        },
        methods: {
            async commit() { // 提交
                this.data_id = await this.$refs.external_embed_operate.change_data_data();
                await this.$refs.workflow_wrapper.create_workflow("develop_project_requirements", "研发项目需求", this.data_id);
            }
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
