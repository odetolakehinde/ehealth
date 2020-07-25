<template>
  <v-container>
    <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Name"
            single-line v-model="name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Age"
            type="number" dark
            solo v-model.number="age"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
          :items="bloodGroups"
          label="Blood Group"
          solo v-model="bloodgroup"
        ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn depressed x-large block :loading="isButtonLoading" @click="addData" color="success">Add Data</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </v-container>
</template>

<script>
import db from '../firebase'
export default {
  name: 'HelloWorld',

  data: () => ({
    name: '',
    age: 0,
    bloodgroup: '',
    bloodGroups: ['A', 'AB', 'B', 'O'],
    isButtonLoading: false,
    isFetchingData: true
  }),

  methods: {
    addData () {
      this.isButtonLoading = true
      db.collection('sampledata').add({
        name: this.name,
        age: parseInt(this.age),
        bloodgroup: this.bloodgroup
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef)
          this.isButtonLoading = false
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
          this.isButtonLoading = false
        })
    },
    fetchData () {
      this.isFetchingData = true
    }
  },

  mounted () {
    this.fetchData()
  }
}
</script>
