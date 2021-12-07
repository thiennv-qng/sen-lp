import { Row, Card, Col, Typography, Space } from 'antd'
import NumericInput from 'app/shared/components/numericInput'

const FeeInput = ({
  title,
  label,
  ratio,
  currentRatio = '0',
  onChange = () => { },
}: {
  title: string
  label: string
  ratio: string | number
  currentRatio: string
  onChange?: (e: any) => void
}) => {
  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Typography.Text type="secondary">{title}</Typography.Text>
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ padding: 4 }} bordered={false}>
          <NumericInput
            placeholder={0}
            value={ratio}
            onChange={onChange}
            bordered={false}
          />
        </Card>
      </Col>
      <Col span={24} style={{ fontSize: 12 }}>
        <Space size={4}>
          <Typography.Text type="secondary">{label}:</Typography.Text>
          <Typography.Text>{currentRatio}%</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}
export default FeeInput
