# pair-project-hacktiv8-phase1

# Step By Step Pair Project Fitness Web App

> ## Buat Model

### User
- first_name (string)
- last_name (string)
- gender (string)
- email (string)
- height (integer)
- current_weight (integer)
- activities_level (string)
- goal (string)

### Workout
- name (string)
- video (string)

### UserWorkout (conjuction table)
- UserId (integer) (fk)
- WorkoutId (integer) (fk)
- progress (???)

### Weight
- weight (integer)
- UserId (integer) (fk)

> ## Routing

| Method  | Route     | Fungsi |
| :------:| :----:    | :----: |
| GET     | /         | Menampilkan **Home** dimana terdapat link menuju **Login** dan **Register** dan menampilkan Program-program apa saja yang ada di table **Programs**  |
| GET     | /login    | Menampilkan form log in |
| POST    | /login    | Redirect ke **dashboard** |
| GET     | /register | Menampilkan form register   |
| POST    | /register | Menambahkan data ke table **Users** Redirect ke **dashboard**   |
| GET     | /dashboard | Menampilkan status user (yang ada di table Users, kemudian ada rekomendasi berat badan ideal dan kalori yang dibutuhkan menggunakan **fitness-health-calculations**), form edit **Weight** , Diagram yang menampilkan histori dari **Weight** user tersebut menggunakan **ChartJs**, sebuah link yang menuju edit user, dan List program apa saja yang user tersebut gunakan, terdapat juga tombol lihat video|
| POST    | /dashboard | Menambahkan weight ke table **Weights** lalu redirect ke **dashboard**   |
| GET     | /edit/:id    | Menampilkan form edit User, dan bisa delete history **Weight** disini (history **weight** diurutkan dari yang paling akhir diatas, weight paling atas tidak bisa di delete) |
| POST    | /edit/:id    | Edit User kemudian Redirect ke **dashboard** |
| GET     | /delete/:id    | Delete history kemudian Redirect ke **/edit/:id** |

> ## Setelah selesai semua, tambahkan validasi
> ## Deploy di heroku
