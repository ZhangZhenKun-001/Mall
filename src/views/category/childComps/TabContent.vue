<template>
</template>

<script>

	import TabContentCategory from "./TabContentCategory";
  import TabContentDetail from "./TabContentDetail";
  import Scroll from "components/common/scroll/Scroll.vue";

  export default {
		name: "TabContent",
    components: {
		  Scroll,
      TabContentCategory,
      TabContentDetail
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      },
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
	}
</script>

<style scoped>
</style>
