import { Card, Col, Row, Typography } from "antd"
import SenChart from "app/components/chart"


const TotalValueLocked = () => {
  return <Card bordered={false}>
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text>Total Value Locked</Typography.Text>
      </Col>
      <Col>
        123.5M
    </Col>
      <Col span={24}>
        <SenChart chartData={[12, 3, 4, 12, 51, 2]} labels={['20/10', '21/10', '22/10', '23/10', '24/10', '25/10']} />
      </Col>
    </Row>
  </Card>
}

export default TotalValueLocked