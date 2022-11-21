import PageHome from './Classes/Pages/PageHome.js';
import PageAboutUs from './Classes/Pages/PageAboutUs.js';
import PageAccount from './Classes/Pages/PageAccount.js';
import PageBlog from './Classes/Pages/PageBlog.js';
import PageBlogSingle from './Classes/Pages/PageBlogSingle.js';
import PageError from './Classes/Pages/PageError.js';


const parseLocation = () => {
  const hash = location.hash;
  if (hash.includes('?')) {
    return hash.split('?', 2)[0].slice(1).toLowerCase() || '/';
  } else {
    return hash.slice(1).toLowerCase() || '/';
  }
}
const routes = [
  { path: '/', page: new PageHome() },
  { path: '/account', page: new PageAccount() },
  { path: '/about-us', page: new PageAboutUs() },
  { path: '/blog', page: new PageBlog() },
  { path: '/blog/single', page: new PageBlogSingle() },
];

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  const path = parseLocation();
  const { page = new PageError() } = findComponentByPath(path, routes) || {};

  page.render();
};


window.addEventListener('hashchange', router);
window.addEventListener('load', router);