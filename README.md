# Thaisynergy

## Install prerequisites
ก่อนที่จะติดตั้งระบบให้ตรวจสอบให้แน่ใจว่าได้ทำการติดตั้งซอฟต์แวร์ ดังนี้
* [Git](https://git-scm.com/downloads)

## Getting Started
**1. ดาวน์โหลด source code ของระบบ**
```sh
git clone https://gitlab.co.th/folder_name.git
```

**2. เปิดโฟลเดอร์ของระบบที่ได้ clone ลงมาเรียบร้อยแล้ว**

```sh
cd nodejs
```

**3. เริ่มต้นใช้งานสำหรับ development**

```sh
docker-compose -f "docker-compose-dev.yml" up -d
```
> หากต้องการ build image ของ docker ใหม่อีกครั้ง สามารถทำได้โดยการเพิ่ม option --build


**4. เริ่มต้นใช้งานสำหรับ production**

```sh
docker-compose up -d
```

## Running the tests
* เปิด Browser (supports Chrome & Firefox)
* Enter URL (if server is your docker host ip) : (docker-ip):8090