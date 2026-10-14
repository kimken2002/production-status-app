# 生産状況管理アプリ

農業現場での作業状況や社員情報を管理しやすくするための、生産状況管理アプリです。

## アプリケーションの概要
このアプリは、社員情報の登録・一覧表示・編集・削除を行えることに加え、ログイン機能を備えた管理システムです。  
今後の拡張として、生産状況や作業進捗の可視化・管理を目的としています。

## 開発した背景や理由
農業や生産現場では、作業状況や担当者情報を紙や口頭で管理しているケースも多く、人手不足が発生し情報共有に手間がかかることがあります。  
そこで、社員情報や作業状況をデジタルで一元管理できるアプリを作成し、管理業務を効率化することを目的として開発しました。

## アプリケーションのURL
- フロントエンド: （必要に応じて記載）
- バックエンド: （必要に応じて記載）
- GitHub（フロントエンド）: https://github.com/kimuken2002/production-status-app
- GitHub（バックエンド）: https://github.com/kimuken2002/farm-management-backend

## デモ画像
<img width="483" height="351" alt="demo1" src="https://github.com/user-attachments/assets/b55170c1-32dc-40a7-83e2-e7980042fede" />

<img width="914" height="661" alt="demo2" src="https://github.com/user-attachments/assets/e972af15-976f-4c8f-b268-9297a8d14505" />

<img width="1402" height="626" alt="demo4" src="https://github.com/user-attachments/assets/3e57c85a-2e71-41ec-a5e6-eb57e83ceae3" />

<img width="1400" height="566" alt="demo6" src="https://github.com/user-attachments/assets/7505b66f-494e-471b-b1e9-bf2a0904a2b9" />




## 主な使用技術
### フロントエンド
- React
- Vite
- JavaScript
- CSS

### バックエンド
- Spring Boot
- Java
- REST API

### 開発ツール
- Git
- GitHub
- Visual Studio Code
- IntelliJ IDEA

## ER図
社員情報を管理する `employees` テーブルと、生産記録を管理する `production_records` テーブルを中心とした構成です。  
社員一覧・社員登録・ログイン機能は社員テーブルと対応し、生産入力進捗画面は生産記録テーブルと対応しています。

<img width="632" height="276" alt="ER" src="https://github.com/user-attachments/assets/ae9563bf-ae46-42bf-84dd-ade8fd474da0" />


## インフラ構成図
社員登録、進捗入力画面（散水）は管理者のみの入力としている。
農作業での管理が多く、パソコン、スマホなどの持ち込みができないため、パソコン１台での運用としている。
<img width="352" height="540" alt="インフラ構成図" src="https://github.com/user-attachments/assets/19bbd0ac-b685-44a2-bf51-7f56b2ed3e31" />




## ローカル環境での起動方法


### フロントエンド
```bash
cd production-status-app
npm install
npm run dev

### バックエンド
cd farm-management-backend
./mvnw spring-boot:run
