import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import CheckoutRestaurantSection from '@/components/checkout/CheckoutRestaurantSection';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import DeliveryReviewCard from '@/components/review/DeliveryReviewCard';
import InstructionsReviewCard from '@/components/review/InstructionsReviewCard';
import PaymentReviewCard from '@/components/review/PaymentReviewCard';
import { useCartStore } from '@/store/cartStore';
import { groupCartItemsByRestaurant } from '@/utils/cartHelpers';
import { placeOrder } from '@/services/orderService';
import { APP_CONFIG } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { getRestaurantAvailabilityById } from '@/services/availabilityService';

export default function OrderReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);

  const state = location.state;
  const restaurantId = state?.restaurantId;

  // Snapshot cart items on mount to prevent reactive re-renders/redirects during store updates
  const [initialItems] = useState(() => {
    return restaurantId
      ? cartItems.filter((item) => item.restaurantId === restaurantId)
      : cartItems;
  });

  if (!state || !state.formData) {
    return <Navigate to={ROUTES.CHECKOUT} replace />;
  }

  const { formData } = state;

  if (initialItems.length === 0) {
    return <Navigate to={ROUTES.CHECKOUT} replace />;
  }

  // Calculate pricing
  const subtotal = initialItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = APP_CONFIG.DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  // Enforce availability validation checks
  const uniqueRestaurantIds = [...new Set(initialItems.map((item) => item.restaurantId))];
  const closedRestaurantAvail = uniqueRestaurantIds
    .map((id) => getRestaurantAvailabilityById(id))
    .find((avail) => !avail.canOrder);
  const canPlace = !closedRestaurantAvail;

  // Group items using the shared utility helper
  const groupedRestaurants = groupCartItemsByRestaurant(initialItems);

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
    try {
      const order = placeOrder({
        cartItems,
        formData,
        restaurantId,
        pricing: {
          subtotal,
          deliveryFee,
          total: grandTotal,
        },
      });
      navigate(ROUTES.SUCCESS, {
        state: {
          orderId: order.id,
        },
      });
    } catch (err) {
      alert(err.message || 'An error occurred while placing your order.');
    }
  };

  return (
    <PageWrapper title="Order Review" className="pb-16" containerClassName="max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Order Review
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Verifying details for{' '}
            <span className="font-semibold text-orange-400">{activeModeText}</span>
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
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-lg font-bold text-white font-heading">Items</h3>
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
          <div className="lg:sticky lg:top-24 space-y-4">
            <CheckoutSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              grandTotal={grandTotal}
            >
              <div className="space-y-4">
                {/* Contextual Availability Warning */}
                {!canPlace && (
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-xs text-rose-400 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <span>⚠️</span> Ordering Currently Closed
                    </p>
                    <p className="leading-relaxed">
                      One or more restaurants in your order are currently closed. Ordering will become available once the restaurants reopen.
                    </p>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={!canPlace}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold shadow-md transition duration-200 focus:outline-none ${
                    canPlace
                      ? 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer shadow-orange-950/20'
                      : 'bg-neutral-800 text-slate-500 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  Place Order
                </button>
              </div>
            </CheckoutSummary>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
