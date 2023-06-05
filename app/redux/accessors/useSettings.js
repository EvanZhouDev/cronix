import { useSelector } from 'react-redux';

export default function useSettings() {
  const settings = useSelector((state) => state.sessions.settings);
  return settings;
}