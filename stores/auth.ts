import { defineStore } from 'pinia'

interface AuthState {
  loggedIn: boolean,
  user: Object,
  errors: Object
}

const runtimeConfig = useRuntimeConfig()

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
      loggedIn: false,
      user: {},
      errors: {}
    }),

    actions: {
      async signIn(params: any) {
        const { status, error } = await dataFetch('/login', {
          method: 'post', 
          body: params
        }, 
        useRuntimeConfig().public.publicUrl)
        
        if(status.value == 'success'){
          // Change login state
          this.loggedIn = true;
          // Reset errors state
          this.errors = {}
          
          // Retrieve user
          this.authenticated()
          .then(() => {
            const router = useRouter()
            router.push('/')
          })
        }else{
          console.log('error!')
          this.errors = error._object[error._key].data
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
        const { data: user }: any = await dataFetch('/user')

        if(user.value) this.user = user.value.data

        return this.loggedIn = user.value ? true : false
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