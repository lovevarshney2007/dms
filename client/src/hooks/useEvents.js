import { useState, useEffect } from 'react';
import { getJson } from '../lib/api';

export function useEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await getJson('/events');
        if (isMounted) {
          setData(Array.isArray(res) ? res : []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEvents();
    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
}
