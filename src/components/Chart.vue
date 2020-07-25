<template>
  <v-container>
    <div class="text-center">
      <br><br><br>
      <p v-if="isOnline" class="subtitle-1">You are online</p>
      <v-sheet
        v-if="isFetchingData"
        color="grey lighten-3"
        class="px-3 pt-3 pb-3"
      >
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
      <div v-else>
        <v-row>
          <v-col cols="6">
            <section class="charts">
              <vue-highcharts :options="bloodGroupOptions" ref="barChart"></vue-highcharts>
            </section>
          </v-col>
          <v-col cols="6">
            <section class="charts">
              <vue-highcharts :options="ageOptions" ref="barChart"></vue-highcharts>
            </section>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="text-center mr-15 ml-15" v-if="!isOnline">
      <v-card class="py-10">
        You are offline. We are getting data from the localstorage
      </v-card>
    </div>

    <p class="mt-10 caption text-center">Hint: Data is in console</p>
  </v-container>
</template>

<script>
import db from '../firebase'
import VueHighcharts from 'vue2-highcharts'
import Highcharts from 'highcharts'

export default {
  name: 'Chart',

  data: () => ({
    isFetchingData: true,
    fetchedData: [],
    bloodGroupOptions: null,
    ageOptions: null
  }),

  components: {
    VueHighcharts
  },

  methods: {
    fetchData () {
      db.collection('sampledata')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.fetchedData.push(doc.data())
          })
          this.isFetchingData = false
          console.log(this.fetchedData)
          localStorage.setItem('data', JSON.stringify(this.fetchedData))
          this.sortData()
        })
        .catch((error) => {
          this.isFetchingData = false
          console.log('Error getting documents: ', error)
        })
    },
    sortData () {
      const groupA = this.fetchedData.filter(dat => dat.bloodgroup === 'A').length
      const groupB = this.fetchedData.filter(dat => dat.bloodgroup === 'B').length
      const groupAB = this.fetchedData.filter(dat => dat.bloodgroup === 'AB').length
      const groupO = this.fetchedData.filter(dat => dat.bloodgroup === 'O').length

      const age1 = this.fetchedData.filter(dat => dat.age < 20).length
      const age2 = this.fetchedData.filter(dat => dat.age >= 20 && dat.age < 30).length
      const age3 = this.fetchedData.filter(dat => dat.age > 30).length

      this.bloodGroupOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Blood Group Data'
        },
        xAxis: {
          categories: ['Blood Group'],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of people',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ''
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 50,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: 'A',
            data: [groupA]
          },
          {
            name: 'B',
            data: [groupB]
          },
          {
            name: 'AB',
            data: [groupAB]
          },
          {
            name: 'O',
            data: [groupO]
          }
        ]
      }

      this.ageOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Age Data'
        },
        xAxis: {
          categories: ['Age Range'],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of people',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ''
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 50,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '< 20',
            data: [age1]
          },
          {
            name: '20 - 30',
            data: [age2]
          },
          {
            name: '> 30',
            data: [age3]
          }
        ]
      }
    }
  },

  mounted () {
    this.fetchData()
    if (this.isOffline) {
      this.fetchedData = JSON.parse(localStorage.getItem('data'))
      this.isFetchingData = false
    }
  }
}
</script>
