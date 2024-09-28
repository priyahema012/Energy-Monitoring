import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Space, Button } from 'antd';
import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';
import classes from "./Dashboard.module.css";
import image from "../Assests/WhatsApp Image 2024-09-24 at 13.50.56_234ce64f.jpg";
import dash from "../Assests/WhatsApp Image 2024-09-24 at 13.36.55_6ed29d2b.jpg";
import nav from "../Assests/WhatsApp Image 2024-09-24 at 15.34.29_45d56bc9.jpg";

const Dashboard: React.FC = () => {
  const [chartOptions] = useState({
    options: {
      colors: ["#009d94"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ['20', '12', '12'] as string[],
      },
    },
    series: [
      {
        name: "Leads Data",
        data: [2, 3, 4, 5] as number[],
      },
    ],
  });

  // Power Data for Donut Chart
  const powerData: { options: ApexOptions; series: number[] } = {
    options: {
      labels: ['Running Hours'],
      colors: ['#009d94'],
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom',
      },
    },
    series: [65],
  };

  const powersetData: { options: ApexOptions; series: number[] } = {
    options: {
      colors: ['#009d94'],
      chart: {
        type: 'radialBar' as const,
        offsetY: -20,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ['Average Results'],
    },
    series: [76],
  };

  // New line chart options
  const lineChartOptions = {
    options: {
      chart: {
        id: 'line-chart',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      colors: ['#FF4560'],
    },
    series: [
      {
        name: 'Consumption',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col md={10} className="p-3" style={{ backgroundColor: '#ffffff', minWidth: "175vh" }}>
          {/* Device Details, Today Consumption, and Power Running Hours */}
          <Row>
            <Col md={9}>
              <Card className="mb-3" style={{ width: "455px", position: "relative", right: "10px" }}>
                <Card.Body>
                  <h3 className={`${classes.device} font-weight-bold`}>Device Details</h3>
                  <div className={`d-flex flex-wrap ${classes.relayed}`}>
                    <div className={`me-3 ${classes.device}`}>
                      <strong>EB</strong> <br /> <span>ON</span>
                    </div>
                    <div className={`me-3 ${classes.device}`}>
                      <strong>SUMP</strong> <br /> <span>OFF</span>
                    </div>
                    <div className={`me-3 ${classes.device}`}>
                      <strong>BOREWELL</strong> <br /> <span>OFF</span>
                    </div>
                    <div className={`me-3 ${classes.device}`}>
                      <strong>RELAY 1</strong> <br /> <span>OFF</span>
                    </div>
                    <div className={`me-3 ${classes.device}`}>
                      <strong>RELAY 2</strong> <br /> <span>OFF</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className={`mb-4 ${classes.powerik}`}>
                <Card.Body>
                  <h5 className={`${classes.device} font-weight-bold`}>Last Communicated Date</h5>
                  <div className={classes.device}>
                    <h5>(24-09-2024 09:57 AM)</h5>
                    <h6>Device Data Not Received: -</h6>
                    <h5>Read Error Time: 0hr 0 mins</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className={`mb-4 ${classes.consume}`}>
                <Card.Body>
                  <h5 className={`${classes.devices} font-weight-bold`}>Today Consumption</h5>
                  <Chart
                    options={powersetData.options}
                    series={powersetData.series}
                    type="radialBar"
                    height={300}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className={`mb-4 ${classes.power}`}>
                <Card.Body>
                  <h5 className={`${classes.device} font-weight-bold`}>Power Running Hours</h5>
                  <Chart
                    options={powerData.options}
                    series={powerData.series}
                    type="donut"
                    height={200}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Additional sections for consumption data */}
          <Row gutter={24} className="mb-5 consumption-section">
            {/* Total Consumption Card */}
            <Col span={6}>
              <Card className="consumption-card" style={{ padding: '16px', border: "3px solid rgb(107, 181, 176)", bottom: '210px', position: 'relative' }}>
                Total Consumption <br />
                <div style={{ textAlign: 'center' }}>
                  <img src={nav} width="60px" height="60px" className="icon" />
                  <p className="value">12483.78</p>
                </div>
              </Card>
            </Col>

            {/* Additional cards for data */}
            <Col span={6}>
              <Row gutter={16}>
                <Card className="data-card" style={{ padding: '16px', border: "3px solid rgb(107, 181, 176)", bottom: '230px', left: "20px", position: 'relative', width: "220px" }}>
                  <p>Total Watts: <strong>8.42 (kW)</strong></p>
                  <Space size="small">
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'red', borderColor: 'red' }}>R</Button> 3.5
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'yellow', borderColor: 'yellow' }}>Y</Button> 1.25
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'blue', borderColor: 'blue' }}>B</Button> 3.67
                  </Space>
                </Card>
              </Row>

              <Row gutter={16} className="mt-2">
                <Card className="data-card" style={{ padding: '16px', border: "3px solid rgb(107, 181, 176)", bottom: '220px', left: "20px", position: 'relative', width: "220px" }}>
                  <p>Total VA: <strong>8.43</strong></p>
                  <Space size="small">
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'red', borderColor: 'red' }}>R</Button> 3.5
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'yellow', borderColor: 'yellow' }}>Y</Button> 1.25
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'blue', borderColor: 'blue' }}>B</Button> 3.67
                  </Space>
                </Card>
              </Row>
              
            </Col>


            <Col>
            <Row gutter={16}>
                <Card className="data-card" style={{ padding: '16px', border: "3px solid rgb(107, 181, 176)", bottom: '230px', left: "20px", position: 'relative', width: "220px" }}>
                  <p>Total Watts: <strong>8.42 (kW)</strong></p>
                  <Space size="small">
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'red', borderColor: 'red' }}>R</Button> 3.5
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'yellow', borderColor: 'yellow' }}>Y</Button> 1.25
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'blue', borderColor: 'blue' }}>B</Button> 3.67
                  </Space>
                </Card>
              </Row>

              <Row gutter={16} className="mt-2">
                <Card className="data-card" style={{ padding: '16px', border: "3px solid rgb(107, 181, 176)", bottom: '220px', left: "20px", position: 'relative', width: "220px" }}>
                  <p>Total VA: <strong>8.43</strong></p>
                  <Space size="small">
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'red', borderColor: 'red' }}>R</Button> 3.5
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'yellow', borderColor: 'yellow' }}>Y</Button> 1.25
                    <Button danger shape="circle" size="small" style={{ backgroundColor: 'blue', borderColor: 'blue' }}>B</Button> 3.67
                  </Space>
                </Card>
              </Row>


            </Col>
          </Row>

          {/* Graphs Section */}
          <Row className={classes.call}>
            <Col md={6}>
              <Card className="mb-4 ">
                <Card.Body>
                  <h5 className="font-weight-bold">Consumption Over Time</h5>
                
                    <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="bar"
                    height={300}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="font-weight-bold">Leads Data</h5>
                  <Chart
                    options={lineChartOptions.options}
                    series={lineChartOptions.series}
                    type="line"
                    height={300}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>


          
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
