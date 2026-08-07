import { useState, useEffect } from 'react';
import { getJson } from '../lib/api';

export function useContent(type) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchContent() {
      try {
        setLoading(true);
        const res = await getJson(`/content/${type}`);
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
    fetchContent();
    return () => { isMounted = false; };
  }, [type]);

  return { data, loading, error };
}
