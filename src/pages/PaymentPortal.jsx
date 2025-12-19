import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, Lock, Smartphone, CreditCard, Building, ChevronRight, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/CartStore';

export default function PaymentPortal() {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart, items: storeItems, getTotal } = useCartStore();

    // Get state passed from checkout, or fallback to store items (useful for new tab)
    const { total: stateTotal, items: stateItems } = location.state || {};

    const items = stateItems || storeItems;
    const total = stateTotal || getTotal();

    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState('select'); // select, processing, success

    useEffect(() => {
        // Safety check: if accessed directly without cart state, maybe redirect? 
        // We'll allow it for demo purposes but show 0 total
    }, []);

    const handlePayment = () => {
        setProcessing(true);
        setStep('processing');

        // Simulate gateway delay
        setTimeout(() => {
            setProcessing(false);
            setStep('success');
            clearCart();

            // Auto redirect after success
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        }, 2500);
    };

    if (step === 'processing') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-[#5f259f] border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock size={24} className="text-[#5f259f]" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Processing Payment</h2>
                        <p className="text-gray-500 mt-2">Please do not close this window...</p>
                    </div>
                    <div className="p-4 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center justify-center gap-2">
                        <Shield size={16} />
                        Secured by SecurePay
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <CheckCircle size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
                        <p className="text-gray-500 mt-2">Transaction ID: TXN_{Date.now()}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-500">Redirecting to merchant...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8 font-sans">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left: Summary */}
                <div className="w-full md:w-1/3 bg-[#0a0a0a] text-white p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <div className="z-10">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                            <ArrowLeft size={16} /> Cancel
                        </button>

                        <div className="mb-8">
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Pay To</p>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Shield className="text-primary" /> LeatherCAD
                            </h2>
                        </div>

                        <div className="mb-8">
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Amount</p>
                            <h1 className="text-4xl font-bold text-white">${total.toFixed(2)}</h1>
                            <p className="text-xs text-gray-500 mt-2">Inc. all taxes & charges</p>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">Order Details</p>
                            <div className="space-y-3">
                                {items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-start text-sm">
                                        <span className="text-gray-300">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                </div>

                {/* Right: Payment Options */}
                <div className="w-full md:w-2/3 bg-white p-8 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                        Select Payment Method
                        <span className="text-xs font-normal text-gray-400 flex items-center gap-1">
                            <Lock size={12} /> Secure Connection
                        </span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 flex-1">
                        {/* Sidebar Options */}
                        <div className="w-full md:w-48 space-y-1">
                            {[
                                { id: 'upi', label: 'UPI / QR', icon: Smartphone, color: 'text-purple-600' },
                                { id: 'card', label: 'Cards', icon: CreditCard, color: 'text-blue-600' },
                                { id: 'netbanking', label: 'NetBanking', icon: Building, color: 'text-green-600' },
                            ].map(method => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${selectedMethod === method.id
                                        ? 'bg-primary/5 text-primary border-l-4 border-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:pl-5'
                                        }`}
                                >
                                    <method.icon size={18} className={selectedMethod === method.id ? 'text-primary' : 'text-gray-400'} />
                                    {method.label}
                                </button>
                            ))}
                        </div>

                        {/* Active Component */}
                        <div className="flex-1 border-l border-gray-100 pl-8">
                            {selectedMethod === 'upi' && (
                                <div className="space-y-6 ani-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="p-4 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5 flex flex-col items-center justify-center text-center">
                                        <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-sm mb-3">
                                            <img
                                                src="/assets/payment-qr.jpeg"
                                                alt="Payment QR"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">Scan to pay with any UPI App</p>
                                        <p className="text-xs text-gray-500 mt-1">SIDDHANT PATEL</p>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Or select app</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <a href="https://www.phonepe.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-[#5f259f] hover:bg-[#5f259f]/5 transition-all group no-underline">
                                                <div className="w-8 h-8 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-xs">Pe</div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#5f259f]">PhonePe</span>
                                            </a>
                                            <a href="https://paytm.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-[#00baf2] hover:bg-[#00baf2]/5 transition-all group no-underline">
                                                <div className="w-8 h-8 rounded-full bg-[#00baf2] flex items-center justify-center text-white font-bold text-xs">Pay</div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#00baf2]">Paytm</span>
                                            </a>
                                            <a href="https://pay.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group no-underline">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">G</div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500">Google Pay</span>
                                            </a>
                                            <a href="https://www.bhimupi.org.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group no-underline">
                                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">BHIM</div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500">BHIM UPI</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">or enter UPI ID</span></div>
                                    </div>

                                    <div className="flex gap-2">
                                        <input type="text" placeholder="e.g. 9876543210@ybl" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                        <button onClick={handlePayment} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">Verify</button>
                                    </div>
                                </div>
                            )}

                            {selectedMethod === 'card' && (
                                <div className="space-y-4 ani-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-sm font-bold text-gray-700">Enter Card Details</h3>
                                            <div className="flex gap-1">
                                                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                        <input type="text" placeholder="Card Number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="MM / YY" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                            <input type="text" placeholder="CVV" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                        </div>
                                        <input type="text" placeholder="Card Holder Name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <button onClick={handlePayment} className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
                                        Pay ${total.toFixed(2)}
                                    </button>
                                </div>
                            )}

                            {selectedMethod === 'netbanking' && (
                                <div className="space-y-4 ani-in fade-in slide-in-from-right-4 duration-300">
                                    <p className="text-sm text-gray-600">Select your bank</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'Others'].map(bank => (
                                            <button key={bank} onClick={handlePayment} className="p-3 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 text-sm font-medium text-gray-700">
                                                {bank}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
