import { Col, Row } from "antd"
import LiquidityPosition from "./liquidityPosition"
import PoolManagement from "./management"
import TotalValueLocked from "./totalValueLocked"
import Volume24h from "./volume24h"

const PoolDetails = () => {
  return <Row gutter={[24, 24]}>
    <Col span={24}>
      <TotalValueLocked />
    </Col>
    <Col span={12}>
      <LiquidityPosition />
    </Col>
    <Col span={12}>
      <Volume24h />
    </Col>
    {/* <Col span={12}>
      <PoolManagement address={''} />
    </Col> */}
  </Row>
}

export default PoolDetails