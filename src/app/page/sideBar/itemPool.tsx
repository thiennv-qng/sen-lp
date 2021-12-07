import { Card, Col, Divider, Row, Space, Typography } from "antd"
import { MintAvatar } from "app/shared/components/mint"
import IonIcon from "shared/ionicon"

const ExtraTypography = ({ tvl = 0, apy = 0 }: { tvl?: number, apy?: number }) => {
  return <Space size={12}>
    <Space size={4}>
      <Typography.Text>TVL:</Typography.Text>
      <Typography.Text>{tvl}</Typography.Text>
    </Space>
    <Divider type="vertical" />
    <Space size={4}>
      <Typography.Text>APY:</Typography.Text>
      <Typography.Text>{apy}</Typography.Text>
    </Space>
  </Space>
}

const ItemPool = ({ poolAddress }: { poolAddress: string }) => {
  return <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: 12 }} bordered={false}>
    <Row gutter={[8, 8]} align="middle">
      <Col flex="auto">
        <Space direction="vertical">
          <MintAvatar mintAddress={poolAddress} />
          <ExtraTypography tvl={313} apy={20} />
        </Space>
      </Col>
      <Col>
        <Space>
          <IonIcon name="person-outline" />
          <IonIcon name="arrow-forward-outline" />
        </Space>
      </Col>
    </Row>
  </Card>
}

export default ItemPool