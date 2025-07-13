import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyPage() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/verify-transak-payment')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    navigate('/form-builder');
                } else {
                    alert('Payment not verified. Please try again.');
                }
            })
            .catch(() => {
                alert('Verification failed. Please check your connection.');
            });
    }, []);

    return <div className="text-white p-6">🔄 Verifying your payment...</div>;
}
