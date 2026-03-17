import { useSessionHistory } from './useSessionHistory'

export function useLastSession() {
  const { sessions } = useSessionHistory()
  const session = sessions.length > 0 ? sessions[sessions.length - 1] : null
  return { session }
}
