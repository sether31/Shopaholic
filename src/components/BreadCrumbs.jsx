import { IoIosArrowForward } from 'react-icons/io';
import { useLocation, Link } from 'react-router-dom'

export default function BreadCrumbs() {

  const loc = useLocation();
  let currentLink = '';
  const pathnames = loc.pathname.split('/').filter((name) => name !== '');

  const breadCrumbs = pathnames.map((crumb, index) => {
    currentLink += `/${crumb}`;

    const formatCrumb = crumb.charAt(0).toUpperCase() + crumb.slice(1);

    return (
      <div key={index} className='inline-block mr-1'>
        <Link className='flex items-center gap-1' to={currentLink}>
          <p className='hover:text-gray-600'>{formatCrumb}</p>
          {index < pathnames.length - 1 && <IoIosArrowForward size={10} />}
        </Link>
      </div>
    )
  });

  return (
    <nav className="my-4">
      <div className="flex flex-wrap items-center">
        <Link to="/" className="mr-1 hover:text-gray-600">Home</Link>
        {pathnames.length > 0 && <IoIosArrowForward className='mt-1 mr-1' size={10} />}
        {breadCrumbs}
      </div>
    </nav>
  )
}
