import cookies from 'js-cookie'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '@framework/const'

const getCheckoutId = () => cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)

export default getCheckoutId
