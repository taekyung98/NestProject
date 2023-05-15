<template>
<v-sheet>
  <v-text-field
      label="우편번호"
      :value="zipcode"
      readonly
      prepend-icon="mdi-map-marker"
  >
    <template v-slot:append>
      <v-btn icon small tabindex="-1" @click="open">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</v-sheet>
  <v-text-field label="주소" :value="addr1" readonly></v-text-field>
  <v-text-field
      label="상세주소"
      :value="addr2"
  ></v-text-field>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-toolbar>
      <v-toolbar-title>주소검색</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon plain @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
  </v-dialog>
</template>

<script lang="ts">


import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  components: {}
})
export default class inputAddress extends Vue {
@Prop() zipcode: string = '';
@Prop() addr1: string = '';
@Prop() addr2: string = '';

private dialog :boolean = false;

open(){
  this.dialog = true;
}
close(){
  this.dialog = false;
}
  oncomplete(result: { userSelectedType: string; roadAddress: string; jibunAddress: string; }){
    if(result.userSelectedType === 'R'){  // 도로명 주소 선택
      this.zipcode = result.roadAddress;
    }else{  // 지번 주소 선택
      this.zipcode = result.jibunAddress;
    }
    this.dialog = false
  }

}
</script>

<style scoped>

</style>