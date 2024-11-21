var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const endpoint = process.env.NODE_ENV === "development"
    ? "https://refactored-space-couscous-r65x9p4pxqghw7gv-3000.app.github.dev/"
    : "";
export function fetchSubscriptionStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            // Check userInfo cookie
            const userInfoStr = Cookies.get('userInfo');
            if (userInfoStr) {
                const userInfo = JSON.parse(decodeURIComponent(userInfoStr));
                const response = yield axios.get(`${endpoint}/subscription/${userInfo.id}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                    },
                });
                return response.data.success && ((_a = response.data.data) === null || _a === void 0 ? void 0 : _a.status) === 'active';
            }
            // Fallback to userToken if userInfo is not available
            const userToken = Cookies.get('userToken');
            if (userToken) {
                const decodedToken = jwtDecode(userToken);
                const response = yield axios.get(`${endpoint}/subscription/${decodedToken.id}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                    },
                });
                return response.data.success && ((_b = response.data.data) === null || _b === void 0 ? void 0 : _b.status) === 'active';
            }
            // Default to non-premium if no valid cookies found
            return false;
        }
        catch (error) {
            console.error('Error fetching subscription status:', error);
            return false;
        }
    });
}
