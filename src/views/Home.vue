<template>
    <v-app id="keep">
    <!-- Bar -->
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Store&nbsp;<span class="font-weight-light">Online</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
      ></v-text-field>
      <v-btn icon @click="callService" v-if="content=='products'">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
        <v-btn icon @click="content='products'">
          <v-icon>mdi-apps</v-icon>
        </v-btn>
       <v-btn icon @click="content='settings'">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      <span v-if="response && response.profile">
        <v-icon
          color="grey lighten-3"
          large
        >
          mdi-account-circle
        </v-icon> 
        {{response.profile.name}}
      </span>
    </v-app-bar>
      <!-- Home menu -->
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        color="grey lighten-4"
      >
         <v-list
          dense
          class="grey lighten-4"
         >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="content='products'">
              <v-list-item-title>Product Catalog</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="content='tokens'">
              <v-list-item-title>View tokens</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="content='settings'">
              <v-list-item-title>Settings</v-list-item-title>
             </v-list-item-content>
          </v-list-item>
         </v-list>
     </v-navigation-drawer>
    <v-main class="grey lighten-4">
      <v-progress-linear v-if="api.loading" :indeterminate="true" />
      <v-container
        fluid
        class="grey lighten-4"
      >
        <!-- Products page content -->
        <v-row v-if="content=='products'"
          justify="center"
          align="center"
        >
           <v-col
            v-for="result in results"
            :key="result.title"
            cols="4"
          >
          <v-card>
            <v-img
              :src='"product-" + result.id +".png"'
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="250px"
            >
            </v-img>
            <v-card-title>
              {{result.name}}
            </v-card-title>
            <v-card-subtitle>
               {{result.description}}
            </v-card-subtitle>
            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="result.id"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="grey--text ml-4">{{result.id}} (200)</div>
              </v-row>
            </v-card-text>
            <v-card-actions>
               <v-btn text>Details</v-btn>
                <v-btn
                  text
                >
                  Buy
                </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        </v-row>
        <!-- Token page content -->
        <v-row v-if="content=='tokens'">
          <v-expansion-panels popout>
            <v-expansion-panel>
              <v-expansion-panel-header>ID Token JWT</v-expansion-panel-header>
              <v-expansion-panel-content>
                  {{response.id_token}}
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>ID Token Payload</v-expansion-panel-header>
              <v-expansion-panel-content>
                  {{response.profile}}
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
            <v-expansion-panel-header>Access Token</v-expansion-panel-header>
              <v-expansion-panel-content>
                  {{accessToken}}
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Scopes</v-expansion-panel-header>
              <v-expansion-panel-content>
                  {{response.scope}}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <!-- Setting page content -->
        <v-row v-if="content=='settings'">
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="api.url"
                label="API Endpoint"
                outlined
                clearable
              ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
   </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  name: 'User',
  data: () => ({
    results: null,
    content : "products", // Default page
    api : {
      url : '$VUE_APP_API_URL',
      loading : false
    },
    drawer: null
  }),
  computed: {
    ...mapGetters({
        accessToken : 'auth/accessToken',
        response : 'auth/tokenResponse'
      })
  },
  methods: {
    callService : function() 
    {
        console.log("Calling service");
        this.api.loading = true;
        // Adding Authorization Bearer with at for api call
        //TODO: Handling 401 Error
        let authHeader = { headers: { Authorization: 'Bearer ' + this.accessToken } };
        axios.get(this.api.url, authHeader).then((response) => {
          this.results = response.data;
          this.api.loading = false;
          console.log(this.results)
      }).catch( error => { 
        console.log(error); 
        this.api.loading = false;
      });
    },
    logout : function () {
      //TODO: Not implemented yet
      this.$store.dispatch("auth/signOut");
    }
  },
  created() {
    this.callService();
  }
}
</script>