# database.py
import gspread
import json
from google.oauth2.service_account import Credentials
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time

# ===== 1. AUTENTIKASI =====
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
creds = Credentials.from_service_account_file("service-account-key.json", scopes=SCOPES)
client = gspread.authorize(creds)

# ===== 2. BUKA SPREADSHEET =====
SPREADSHEET_ID = "ID_SPREADSHEET_KAMU"  # Ganti dengan ID-mu
SHEET_NAME = "Form Responses 1"  # Biasanya nama default sheet dari Google Form

spreadsheet = client.open_by_key(SPREADSHEET_ID)
worksheet = spreadsheet.worksheet(SHEET_NAME)

# ===== 3. BACA DATA =====
all_records = worksheet.get_all_records()  # List of dictionaries

# ===== 4. FUNGSI GEOCODING (Opsional) =====
def get_coordinates_from_address(address):
    """Mengubah alamat teks menjadi koordinat lat, lng"""
    try:
        geolocator = Nominatim(user_agent="ikatan_alumni_app")
        location = geolocator.geocode(address, timeout=10)
        if location:
            return [location.latitude, location.longitude]
        else:
            print(f"⚠️  Alamat tidak ditemukan: {address}")
            return None
    except GeocoderTimedOut:
        print(f"⏱️  Timeout untuk: {address}")
        return None

# ===== 5. PROSES DATA =====
alumni_for_map = []

for record in all_records:
    # Pastikan nama kolom sama persis dengan di spreadsheet
    nama = record.get("Nama Lengkap", "").strip()
    alamat = record.get("Alamat Lengkap Instansi/Universitas", "").strip()
    
    if not nama:  # Lewati baris kosong
        continue
    
    # Coba dapatkan koordinat dari alamat
    koordinat = get_coordinates_from_address(alamat) if alamat else None
    
    # Jika geocoding gagal, gunakan nilai default atau biarkan null
    if not koordinat:
        koordinat = [-6.2088, 106.8456]  # Default ke Jakarta (opsional)
    
    # Format data untuk frontend
    alumni_data = {
        "nama": nama,
        "nim": record.get("NIM", ""),
        "angkatan": record.get("Angkatan", ""),
        "instansi": record.get("Instansi/Universitas", ""),
        "posisi": record.get("Posisi Jabatan", ""),
        "level": record.get("Level Jabatan", ""),
        "kontak": record.get("Nomor WhatsApp", ""),
        "alamat": alamat,
        "lokasi": koordinat,
        "popupInfo": f"""
            <b>{nama}</b><br>
            <b>NIM:</b> {record.get('NIM', '')}<br>
            <b>Angkatan:</b> {record.get('Angkatan', '')}<br>
            <b>Posisi:</b> {record.get('Posisi Jabatan', '')} ({record.get('Level Jabatan', '')})<br>
            <b>Instansi:</b> {record.get('Instansi/Universitas', '')}<br>
            <b>Kontak:</b> {record.get('Nomor WhatsApp', '')}
        """
    }
    
    alumni_for_map.append(alumni_data)
    time.sleep(1)  # Jeda untuk menghindari limit geocoding

# ===== 6. SIMPAN KE FILE JSON =====
with open("database/alumni_data.json", "w", encoding="utf-8") as f:
    json.dump(alumni_for_map, f, indent=2, ensure_ascii=False)

print(f"✅ Data berhasil diproses. Jumlah alumni: {len(alumni_for_map)}")