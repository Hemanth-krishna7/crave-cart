import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import CheckoutRestaurantSection from '@/components/checkout/CheckoutRestaurantSection';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import DeliveryReviewCard from '@/components/review/DeliveryReviewCard';
import InstructionsReviewCard from '@/components/review/InstructionsReviewCard';
import PaymentReviewCard from '@/components/review/PaymentReviewCard';
import { useCartStore } from '@/store/cartStore';
import { groupCartItemsByRestaurant } from '@/utils/cartHelpers';
import { generateOrderReference } from '@/utils/orderReference';
import { APP_CONFIG } from '@/constants/app';
import { ROUTES } from '@/constants/routes';

export default function OrderReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);

  const state = location.state;
  if (!state || !state.formData) {
    return <Navigate to={ROUTES.CHECKOUT} replace />;
  }

  const { formData, restaurantId } = state;

  // Filter items matching the checkout mode (single vs all)
  const items = restaurantId
    ? cartItems.filter((item) => item.restaurantId === restaurantId)
    : cartItems;

  if (items.length === 0) {
    return <Navigate to={ROUTES.CHECKOUT} replace />;
  }

  // Calculate pricing
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = APP_CONFIG.DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  // Group items using the shared utility helper
  const groupedRestaurants = groupCartItemsByRestaurant(items);

  const activeModeText = restaurantId
    ? (groupedRestaurants[0]?.restaurant?.name || 'Restaurant')
    : `${groupedRestaurants.length} ${groupedRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'}`;

  const handleEdit = () => {
    navigate(restaurantId ? ROUTES.CHECKOUT_RESTAURANT.replace(':restaurantId', restaurantId) : ROUTES.CHECKOUT, {
      state: {
        formData,
      },
    });
  };

  const handlePlaceOrder = () => {
    const orderId = generateOrderReference();
    navigate(ROUTES.SUCCESS, {
      state: {
        orderId,
        deliveryInfo: formData,
        paymentMethod: formData.paymentMethod,
      },
    });
  };

  return (
    <PageWrapper title="Order Review" className="pb-16" containerClassName="max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Order Review
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verifying details for{' '}
            <span className="font-semibold text-orange-600">{activeModeText}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Review Panel columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery address review */}
            <DeliveryReviewCard formData={formData} onEdit={handleEdit} />

            {/* Special Instructions review */}
            <InstructionsReviewCard instructions={formData.instructions} />

            {/* Payment type review */}
            <PaymentReviewCard paymentMethod={formData.paymentMethod} />

            {/* Read-only items lists */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 font-heading font-heading">Items</h3>
              {groupedRestaurants.map((group) => (
                <CheckoutRestaurantSection
                  key={group.restaurantId}
                  restaurantName={group.restaurant ? group.restaurant.name : 'Restaurant'}
                  items={group.items}
                />
              ))}
            </div>
          </div>

          {/* Right Summary column */}
          <div className="lg:sticky lg:top-24">
            <CheckoutSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              grandTotal={grandTotal}
            >
              <button
                onClick={handlePlaceOrder}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
              >
                Place Order
              </button>
            </CheckoutSummary>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
