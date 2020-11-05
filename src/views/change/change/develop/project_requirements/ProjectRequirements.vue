<template>
  <div>
    <router-view/>
    <WorkflowWrapper></WorkflowWrapper>
    <div>
      <!--前置流程区域-->
    </div>
    <ExternalEmbedOperate
      :directory_id=directory_id
      :directory_name=directory_name
      :data_id=data_id
    ></ExternalEmbedOperate>
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
        }
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
