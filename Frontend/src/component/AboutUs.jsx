import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const AboutUs = () => {
  return (
    <>
      <section
        id="about"
        className="py-5"
        style={{ backgroundColor: "#d5dfc4" }}
      >
        <div className="container">
          <div className="title text-center">
            <h2 className="position-relative d-inline-block mb-5">About Us</h2>{" "}
          </div>

          <div className="row">
            <div
              className="col d-flex align-items-center justify-content-center"
              style={{ position: "relative", padding: "0" }}
            >
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  overflow: "hidden",
                  textAlign: "center",
                  border: "3px solid red",
                }}
              >
                <img
                  src="Drhhawa.jpg"
                  className="img-thumbnail"
                  alt="..."
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
              <div>
                <h3>DRH HAWA FEBRIANTI</h3>
                <b>Pendidikan dan Latar Belakang</b>
                <p>
                  Dr. Hawa Febrianti meraih gelar Dokter Hewan (Doctor of
                  Veterinary Medicine) dari Universitas Negeri Pendidikan
                  Kedokteran Hewan, sebuah lembaga ternama dalam ilmu kedokteran
                  hewan di Indonesia. Sejak masa studinya, dia menunjukkan minat
                  yang mendalam dalam bidang kesehatan hewan, terutama dalam
                  pelayanan kesehatan preventif dan pengobatan.
                </p>
                <b>Pengalaman Profesional</b>
                <p>
                  Setelah lulus, Dr. Hawa Febrianti mengembangkan karirnya di
                  berbagai praktek hewan, dari klinik hewan kecil hingga rumah
                  sakit hewan besar. Di sana, dia mendapatkan pengalaman luas
                  dalam diagnosis dan perawatan hewan, mulai dari hewan
                  peliharaan kecil hingga hewan ternak besar. Selama
                  bertahun-tahun praktiknya, dia telah berhasil menyembuhkan
                  berbagai penyakit dan memberikan perawatan yang terbaik untuk
                  hewan kesayangan dan hewan ternak. Dr. Hawa juga aktif dalam
                  kampanye pencegahan penyakit hewan dan memberikan pendidikan
                  kepada pemilik hewan tentang pentingnya perawatan yang tepat.
                  Dia sering memberikan seminar dan workshop kepada masyarakat
                  untuk meningkatkan kesadaran akan kesehatan hewan dan
                  pentingnya vaksinasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src="clinic4.jpg" thumbnail />
          </Col>
          <Col xs={6} md={4}>
            <Image src="clinic2.jpg" thumbnail />
          </Col>
          <Col xs={6} md={4}>
            <Image src="clinic3.jpg" thumbnail />
          </Col>
        </Row>
      </Container>

      <footer
        className="py-4"
        style={{ backgroundColor: "rgba(51, 51, 51, 0.8)" }}
      >
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-center">
            <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
              <li style={{ display: "inline-block", margin: "0 10px" }}>
                <a href="tel:123-456-789" style={{ color: "#ffffff" }}>
                  <AiOutlinePhone />
                </a>
              </li>
            </ul>
            <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
              <li style={{ display: "inline-block", margin: "0 10px" }}>
                {" "}
                <a href="mailto:info@example.com" style={{ color: "#ffffff" }}>
                  <AiOutlineMail />
                </a>
              </li>
            </ul>
            <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
              <li style={{ display: "inline-block", margin: "0 10px" }}>
                <a
                  href="https://www.facebook.com/example"
                  style={{ color: "#ffffff" }}
                >
                  <FaFacebook />
                </a>
              </li>
            </ul>
            <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
              <li style={{ display: "inline-block", margin: "0 10px" }}>
                <a
                  href="https://www.instagram.com/example"
                  style={{ color: "#ffffff" }}
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
            <ul
              className="list-unstyled"
              style={{ margin: 0, padding: 0, marginLeft: "auto" }}
            >
              <li style={{ display: "inline-block", margin: "0 10px" }}>
                <a
                  href="https://maps.google.com/?q=Your+Address"
                  style={{ color: "#ffffff" }}
                >
                  View on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutUs;
