import { Routes, Route } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import Restaurants from '@/pages/Restaurants';
import RestaurantDetails from '@/pages/RestaurantDetails';
import Cart from '@/pages/Cart';
import Profile from '@/pages/Profile';
import Orders from '@/pages/Orders';
import Favorites from '@/pages/Favorites';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Checkout from '@/pages/Checkout';
import OrderReview from '@/pages/OrderReview';
import Success from '@/pages/Success';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/constants/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.RESTAURANTS} element={<Restaurants />} />
        <Route path={ROUTES.RESTAURANT_DETAIL} element={<RestaurantDetails />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.ORDERS} element={<Orders />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.CHECKOUT_RESTAURANT} element={<Checkout />} />
        <Route path={ROUTES.CHECKOUT_REVIEW} element={<OrderReview />} />
        <Route path={ROUTES.SUCCESS} element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
