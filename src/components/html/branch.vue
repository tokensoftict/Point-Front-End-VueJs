<template>
  <div class="form-group" :style="'margin-right: '+shift" v-if="this.$user.mybranches.length > 0">
    <label for="currency" v-if="nolabel === true">Branch</label>
    <select ref="textbox" :style="'width :'+width"  v-model="_branch_id" :name="name"  :class="{
        'form-control' : design === 'default',
        'form-control form-control-sm' : design === 'sm',
        'form-control form-control-lg' : design === 'lg',
    }" class="form-select"  @input="handleInput">
      <option v-for="item in items"  :value="item.id">{{ item.name ? item.name : item.text }}</option>
    </select>
  </div>
</template>

<script>

export default {

  data()
  {
    return {
      items : [],
      _branch_id : this.branch_id
    }
  },

  props : {

    refresh : {
      type : Function
    },

    design : {
      type : String,
      default : "default"
    },

    shift :{
      type : String,
      default : "0px"
    }
    ,
    width :{
      type : String,
      default : "150px"
    },

    branch_id : {
      type : String,
      default : "1"
    },

    nolabel : {
      type : Boolean,
      default :true
    }

  },


  methods :{

    handleInput(event) {
      this.$user.setDefaultBranch(event.target.value)
      if(this.refresh !== undefined)
      {
        this.refresh();
      }
    },

    setValue(value) {
      this.$refs.textbox.value = value;
      this.$user.setDefaultBranch(value)
      if(this.refresh !== undefined)
      {
        this.refresh();
      }
    },

    getValue(){
      return this.$refs.textbox.value;
    }

  },

  mounted() {
    this.$nextTick(()=>{
      const data = JSON.parse(localStorage.getItem("user"));
      this._branch_id = data['default_branch']
    })

    for(let key in this.$user.mybranches)
    {
      this.items.push(this.$user.mybranches[key]);
    }
  }

}

</script>
