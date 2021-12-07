import { Col, Row } from "antd"
import ItemPool from "./itemPool"


const ListPools = () => {

  return <Row gutter={[16, 16]}>
    {[1, 2, 3].map((item, idx) => <Col span={24} key={idx}>
      <ItemPool poolAddress={''} />
    </Col>)}
  </Row>
}

export default ListPools