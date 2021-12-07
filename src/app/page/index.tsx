import { Row, Col } from 'antd'

import SideBar from './sideBar'
import PoolDetails from './poolDetails'

const Page = () => {

  return (
    <Row gutter={[24, 24]}>
      <Col span={6}>
        <SideBar />
      </Col>
      <Col md={24} lg={18}>
        <PoolDetails />
      </Col>
    </Row>
  )
}

export default Page
