import { useState } from 'react';
import { CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '@clerk/clerk-react';
import { useCartStore } from '../store/CartStore';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'US',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    // Real cart items
    const { items, getTotal, clearCart } = useCartStore();
    const cartTotal = getTotal();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Payment Intent (Mock)
            // const intentRes = await axios.post('http://localhost:3000/api/payment/create-intent', { ... });

            // 2. Mock Payment Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 3. Create Order in DB
            const token = await getToken();
            const orderConfig = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const orderData = {
                orderItems: items,
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                paymentMethod: 'Card',
                itemsPrice: cartTotal,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: cartTotal,
            };

            await axios.post('http://localhost:3000/api/orders', orderData, orderConfig);

            clearCart();
            setStep(3);
        } catch (error) {
            console.error('Payment/Order failed', error);
            toast.error(`Order creation failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="bg-card border border-border p-8 rounded-2xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-6">Thank you for your purchase. Your custom leather product is being crafted with care.</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div>
                    <div className="flex gap-4 mb-8">
                        <div className={`flex items-center gap-2 text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary/10' : 'border-border'}`}>1</div>
                            Shipping
                        </div>
                        <div className="h-8 flex items-center">
                            <div className="w-8 h-0.5 bg-border"></div>
                        </div>
                        <div className={`flex items-center gap-2 text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary/10' : 'border-border'}`}>2</div>
                            Payment
                        </div>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleShippingSubmit} className="space-y-4">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Truck size={20} /> Shipping Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="firstName" placeholder="First Name" required className="p-3 rounded-lg bg-white border border-gray-300 w-full text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent" onChange={handleChange} />
                                <input type="text" name="lastName" placeholder="Last Name" required className="p-3 rounded-lg bg-white border border-gray-300 w-full text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent" onChange={handleChange} />
                            </div>
                            <input type="text" name="address" placeholder="Address" required className="p-3 rounded-lg bg-white border border-gray-300 w-full text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent" onChange={handleChange} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="city" placeholder="City" required className="p-3 rounded-lg bg-white border border-gray-300 w-full text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent" onChange={handleChange} />
                                <input type="text" name="postalCode" placeholder="Postal Code" required className="p-3 rounded-lg bg-white border border-gray-300 w-full text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent" onChange={handleChange} />
                            </div>
                            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium mt-4">Continue to Payment</button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <CreditCard size={20} /> Payment Method
                            </h2>
                            <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                                <p className="text-sm text-gray-300 mb-2">Shipping to:</p>
                                <p className="font-bold">{formData.address}, {formData.city}, {formData.postalCode}</p>
                            </div>

                            <p className="text-gray-400 text-sm">
                                You will be redirected to our secure payment gateway to complete your purchase using UPI, Card, or NetBanking.
                            </p>

                            <button
                                onClick={() => window.open('/payment-portal', '_blank')}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-primary/25"
                            >
                                Proceed to Payment
                            </button>
                            <button onClick={() => setStep(1)} className="w-full py-3 text-muted-foreground hover:text-foreground">Back to Shipping</button>
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="bg-card border border-border p-6 rounded-2xl h-fit">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-4 mb-4">
                        {items.length === 0 ? (
                            <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                                    </div>
                                    <div>${item.price.toFixed(2)}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
