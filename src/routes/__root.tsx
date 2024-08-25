import { HomeOutlined } from '@ant-design/icons'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'


export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-5 flex gap-2" style={{ marginLeft: '40px' }}>
        <Link
          to="/"
          className="[&.active]:font-bold flex justify-center items-center"
          style={{ fontSize: '24px' }} // Adjust the size as needed
        >
          <HomeOutlined />
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
