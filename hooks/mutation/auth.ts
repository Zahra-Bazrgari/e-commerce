import { logInFunction, signUpFunction } from '@/apis/auth.service'
import { useMutation } from 'react-query'

export const useLogin = () => {
  return useMutation({mutationFn: logInFunction, mutationKey: ["login"]})
}

export const useSingup = () => {
  return useMutation({mutationFn: signUpFunction, mutationKey: ["signup"]})
}