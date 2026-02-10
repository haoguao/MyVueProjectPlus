<template>
  <div class="navContainer" >
    <div class="nav_logo_active">
      <div class="logo">
        <span v-if="show">logo</span>
      </div>
      <div class="active">
        <IconSidebar size="30px" color="#00000090" @click="hidenNav"/>
      </div>
    </div>


    <div class="nav_list_container" >

      <div class="daily_plan">
        icon-<span v-if="show">daily_plan</span>
      </div>

      <div class="hiden_daily_plan">
      </div>

      <div class="list_content" >
        <template v-for="value in source" :key="value">
          <div class="list_item">
            icon-<span v-if="show">{{ value }}</span>
          </div>
        </template>
      </div>

    </div>


    <div class="user_space" v-if="show">

    </div>
  </div>
</template>


<script setup>
import IconSidebar from '@/assets/icons/IconOther/IconSidebar.vue';
import { ref } from 'vue';

const source = ['a', 'b', 'c', 'd']


const show = ref(true)
// const listContentRef = useTemplateRef('listContent')
// const navContainerRef = useTemplateRef('navContainer')
// const navListContainerRef = useTemplateRef('navListContainer')
const hidenNav = () => {
  show.value = !show.value
}



</script>

<style scoped>
.navContainer {
  padding-top: 1%;
  padding-bottom: 1%;
  width: 21%;
  height: 95.5%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.13);
  position: absolute;
  top: 2%;
  left: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav_logo_active {
  flex: 1;
  min-height: 35px;
  max-height: 35px;
  width: 91%;
  background-color: lightblue;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
}

.active {
  display: flex;
  align-items: center;
}

.nav_list_container {
  flex: 9;
  width: 91%;
  overflow: auto;
}

.daily_plan,
.list_item {
  margin-top: 12px;
  width: 100%;
  height: 35px;
  background-color: lightblue;
  border-radius: 15px;
  line-height: 35px;
}


.list_content {
  width: 100%;
  height: 85%;
}

.user_space {
  position: absolute;
  width: 90%;
  height: 72px;
  top: 87.5%;
  border-radius: 15px;
  background-color: lightgoldenrodyellow;

}
</style>
