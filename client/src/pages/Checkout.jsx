import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageWrapper from '@/components/common/PageWrapper';
import CheckoutRestaurantSection from '@/components/checkout/CheckoutRestaurantSection';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import CheckoutEmptyState from '@/components/checkout/CheckoutEmptyState';
import DeliveryForm from '@/components/checkout/DeliveryForm';
import DeliveryInstructions from '@/components/checkout/DeliveryInstructions';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import { useCartStore } from '@/store/cartStore';
import { groupCartItemsByRestaurant } from '@/utils/cartHelpers';
import { RESTAURANTS } from '@/data/restaurants';
import { APP_CONFIG } from '@/constants/app';
import { checkoutSchema } from '@/validations/checkoutSchema';
import { ROUTES } from '@/constants/routes';
import { canPlaceOrder } from '@/services/availabilityService';

function ReviewOrderButton() {
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <button
      type="submit"
      disabled={!isValid}
      className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold shadow-md transition duration-200 focus:outline-none ${
        isValid
          ? 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer shadow-orange-950/20'
          : 'bg-neutral-800 text-slate-500 border border-white/5 cursor-not-allowed'
      }`}
    >
      Review Order
    </button>
  );
}

export default function Checkout() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);

  const restoredData = location.state?.formData;

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: restoredData || {
      fullName: '',
      phoneNumber: '',
      addressLine: '',
      city: '',
      state: '',
      pincode: '',
      instructions: '',
      paymentMethod: 'cod',
    },
  });

  const handleReviewOrder = (data) => {
    navigate(ROUTES.CHECKOUT_REVIEW, {
      state: {
        formData: data,
        restaurantId,
      },
    });
  };

  // 1. If overall cart is empty, redirect/empty state
  if (cartItems.length === 0) {
    return (
      <PageWrapper title="Checkout" className="pb-16" containerClassName="max-w-7xl">
        <CheckoutEmptyState message="Your cart is empty. Add items to cart before checking out." />
      </PageWrapper>
    );
  }

  let checkoutGroups = [];
  let subtotal = 0;
  let activeModeText = '';

  if (restaurantId) {
    // Mode A: Single Restaurant Checkout
    // Validate restaurant exists in dataset
    const matchedRestaurant = RESTAURANTS.find((r) => r.id === restaurantId);
    if (!matchedRestaurant) {
      return (
        <PageWrapper title="Checkout" className="pb-16" containerClassName="max-w-7xl">
          <CheckoutEmptyState message="The selected restaurant does not exist." />
        </PageWrapper>
      );
    }

    // Filter items belonging to this restaurant
    const filteredItems = cartItems.filter((item) => item.restaurantId === restaurantId);
    if (filteredItems.length === 0) {
      return (
        <PageWrapper title="Checkout" className="pb-16" containerClassName="max-w-7xl">
          <CheckoutEmptyState
            message={`No items from "${matchedRestaurant.name}" are currently in your cart.`}
          />
        </PageWrapper>
      );
    }

    checkoutGroups = [
      {
        restaurantId,
        restaurantName: matchedRestaurant.name,
        items: filteredItems,
      },
    ];
    subtotal = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    activeModeText = matchedRestaurant.name;
  } else {
    // Mode B: Checkout All Restaurants
    const groups = groupCartItemsByRestaurant(cartItems);
    checkoutGroups = groups.map((g) => ({
      restaurantId: g.restaurantId,
      restaurantName: g.restaurant ? g.restaurant.name : 'Restaurant',
      items: g.items,
    }));
    subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = checkoutGroups.length;
    activeModeText = `${count} ${count === 1 ? 'Restaurant' : 'Restaurants'}`;
  }

  const deliveryFee = APP_CONFIG.DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  // Enforce availability validation on checkout entry
  const closedGroup = checkoutGroups.find((group) => !canPlaceOrder(group.restaurantId));

  if (closedGroup) {
    return (
      <PageWrapper title="Ordering Unavailable" className="pb-16" containerClassName="max-w-xl">
        <div className="text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 shadow-lg backdrop-blur-md space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-sm text-3xl">
            🔒
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-heading">
              Ordering Unavailable
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
              <span className="font-bold text-white">&ldquo;{closedGroup.restaurantName}&rdquo;</span> is currently closed and not accepting orders.
            </p>
            <p className="text-xs text-slate-500">
              Ordering will become available once the restaurant reopens.
            </p>
          </div>
          <Link
            to={ROUTES.RESTAURANTS}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
          >
            Browse Restaurants
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Checkout" className="pb-16" containerClassName="max-w-7xl">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleReviewOrder)} className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              Checkout
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Reviewing order for{' '}
              <span className="font-semibold text-orange-400">
                {activeModeText}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Input Forms & Restaurant details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <DeliveryForm />

              {/* Delivery Instructions */}
              <DeliveryInstructions />

              {/* Payment Method */}
              <PaymentMethodSelector />

              {/* Order Items */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-lg font-bold text-white font-heading">Review items</h3>
                {checkoutGroups.map((group) => (
                  <CheckoutRestaurantSection
                    key={group.restaurantId}
                    restaurantName={group.restaurantName}
                    items={group.items}
                  />
                ))}
              </div>
            </div>

            {/* Right: Checkout Summary */}
            <div className="lg:sticky lg:top-24">
              <CheckoutSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                grandTotal={grandTotal}
              >
                <ReviewOrderButton />
              </CheckoutSummary>
            </div>
          </div>
        </form>
      </FormProvider>
    </PageWrapper>
  );
}
