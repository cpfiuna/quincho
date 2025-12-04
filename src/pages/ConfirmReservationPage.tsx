import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConfirmReservationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [reservationDetails, setReservationDetails] = useState<any>(null);
  const token = searchParams.get('token');

  useEffect(() => {
    async function confirmReservation() {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        // Verify and update reservation
        // First, update the confirmed field
        const { data: updateData, error: updateError } = await (supabase as any)
          .from('reservations')
          .update({ confirmed: true })
          .eq('confirmation_token', token)
          .gt('token_expires_at', new Date().toISOString())
          .select()
          .maybeSingle();

        if (updateError || !updateData) {
          // Check if token exists but is expired
          const { data: expiredData } = await (supabase as any)
            .from('reservations')
            .select('*')
            .eq('confirmation_token', token)
            .maybeSingle();

          if (expiredData) {
            setStatus('expired');
          } else {
            setStatus('error');
          }
          return;
        }

        setReservationDetails(updateData);
        setStatus('success');
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
      }
    }

    confirmReservation();
  }, [token, navigate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8"
        >
          {status === 'loading' && (
            <div className="text-center">
              <Loader2 className="h-16 w-16 animate-spin text-fiuna-red mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Confirmando tu reserva...
              </h2>
              <p className="text-gray-600">
                Por favor espera mientras procesamos tu confirmación.
              </p>
            </div>
          )}

          {status === 'success' && reservationDetails && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Reserva Confirmada!
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-lg mb-4 text-gray-800">
                  Detalles de tu reserva:
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Responsable:</span> {reservationDetails.responsable}</p>
                  <p><span className="font-medium">Email:</span> {reservationDetails.email}</p>
                  <p><span className="font-medium">Fecha:</span> {formatDate(reservationDetails.fecha)}</p>
                  <p><span className="font-medium">Horario:</span> {reservationDetails.inicio} - {reservationDetails.fin}</p>
                  <p><span className="font-medium">Motivo:</span> {reservationDetails.motivo}</p>
                  <p><span className="font-medium">Personas:</span> {reservationDetails.personas}</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Próximo paso:</strong> Tu solicitud será revisada por un administrador. 
                  Recibirás un correo electrónico cuando tu reserva sea aprobada o rechazada.
                </p>
              </div>

              <button
                onClick={() => navigate('/calendario')}
                className="bg-fiuna-red hover:bg-fiuna-darkred text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Ir al calendario
              </button>
            </div>
          )}

          {status === 'expired' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Enlace Expirado
              </h2>
              <p className="text-gray-600 mb-6">
                Este enlace de confirmación ha expirado. Los enlaces de confirmación son válidos por 24 horas.
              </p>
              <p className="text-gray-600 mb-6">
                Por favor, realiza una nueva reserva para continuar.
              </p>
              <button
                onClick={() => navigate('/nueva-reserva')}
                className="bg-fiuna-red hover:bg-fiuna-darkred text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Nueva reserva
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Error de Confirmación
              </h2>
              <p className="text-gray-600 mb-6">
                El enlace de confirmación no es válido o ya ha sido utilizado.
              </p>
              <p className="text-gray-600 mb-6">
                Si crees que esto es un error, por favor contacta al administrador.
              </p>
              <button
                onClick={() => navigate('/calendario')}
                className="bg-fiuna-red hover:bg-fiuna-darkred text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Volver al calendario
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
