'use client';

import { useCallback, useMemo, useState } from 'react';

export type WaitlistFormData = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
};

type UseWaitlistFormOptions = {
  endpoint?: string; // default: /api/waitlist
  initialValues?: Partial<WaitlistFormData>;
};

export function useWaitlistForm(options: UseWaitlistFormOptions = {}) {
  const endpoint = options.endpoint ?? '/api/waitlist';

  const initial = useMemo<WaitlistFormData>(
    () => ({
      nombre: options.initialValues?.nombre ?? '',
      apellido: options.initialValues?.apellido ?? '',
      telefono: options.initialValues?.telefono ?? '',
      email: options.initialValues?.email ?? '',
    }),
    [options.initialValues]
  );

  const [formData, setFormData] = useState<WaitlistFormData>(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setField = useCallback(
    <K extends keyof WaitlistFormData>(key: K, value: WaitlistFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    setFormData(initial);
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  }, [initial]);

  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ Mapea a los nombres que tu route espera
      const payload = {
        firstName: formData.nombre,
        lastName: formData.apellido,
        phone: formData.telefono,
        email: formData.email,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        // si tu API devuelve { error, details }, mostramos algo útil
        const detailsText =
          Array.isArray(result?.details) && result.details.length
            ? `: ${result.details.map((d: any) => d.message).join(', ')}`
            : '';

        throw new Error((result?.error ?? 'Error submitting form') + detailsText);
      }

      setIsSuccess(true);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, formData]);

  return {
    formData,
    isLoading,
    isSuccess,
    error,

    handleChange,
    setField,
    setFormData,
    submit,
    reset,
  };
}
