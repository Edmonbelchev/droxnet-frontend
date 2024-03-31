import { defineStore } from 'pinia'

interface AuthState {
  loggedIn: boolean,
  user: Object
}

const runtimeConfig = useRuntimeConfig()

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
      loggedIn: false,
      user: {}
    }),

    actions: {
      async signIn(params: any) {
        const { status, error } = await dataFetch('/login', {
          method: 'post', 
          body: params
        })
        
        if(status.value == 'success'){
          // Change login state
          this.loggedIn = true;
          
          // Authenticate user
          return this.authenticated()
        }else{

          const errorMessage = error._object[error._key].data.message

          return { status, errorMessage }
        }
      },

      async signOut(){
        await dataFetch('/logout', {
          method: 'post'
        }, useRuntimeConfig().public.publicUrl)
        .then(() => {
          this.user = {}
          this.loggedIn = false

          const router = useRouter()
          router.push('/login')
        })
      },
      
      async authenticated() {
        const { data: user, status }: any = await dataFetch('/user')

        // Set user state
        if(user.value) {
          this.user = user.value.data
        }

        // Set loggedIn state
        this.loggedIn = user.value ? true : false

        return { user, status }
      },

      async resetPassword(email: string){
        const { data : success, error } = await dataFetch('/forgot-password', {
          method: 'post', 
          body: {
            email: email
          }
        }, useRuntimeConfig().public.publicUrl)

        return { success, error }
      },

      async newPassword(params: any) {
        const { data : success, error } = await dataFetch(runtimeConfig.public.apiUrl + '/reset-password', {
          method: 'post', 
          body: params
        }, useRuntimeConfig().public.publicUrl)

        return { success, error }
      }
    },
})