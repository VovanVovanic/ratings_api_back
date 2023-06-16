import { TopLevelCategory } from "src/top_page/top_page.model/top_page.model";

type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
	0: '/courses',
	1: '/services',
	2: '/books',
	3: '/products'
}