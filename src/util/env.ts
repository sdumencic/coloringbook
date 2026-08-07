export const getZustandDevtoolsEnabled = () => {
  return !['production', 'staging', 'test'].includes(import.meta.env.MODE)
}
