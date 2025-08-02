# Button Component Kullanım Kılavuzu

## Temel Kullanım

```jsx
import Button from '../components/Button'

// Basit kullanım
<Button>Tıkla</Button>

// Variant ile
<Button variant="primary">Ana Buton</Button>
<Button variant="secondary">İkincil Buton</Button>
<Button variant="danger">Tehlikeli İşlem</Button>
```

## Mevcut Variant'lar

### Ana Variant'lar

- **primary** - Ana eylemler için (mavi)
- **secondary** - İkincil eylemler için (gri)
- **danger** - Tehlikeli eylemler için (kırmızı)

### Outline Variant'ları

- **outline-primary** - Ana eylemler için çerçeveli
- **outline-secondary** - İkincil eylemler için çerçeveli
- **outline-danger** - Tehlikeli eylemler için çerçeveli

### Özel Variant'lar

- **ghost** - Şeffaf arka plan
- **tab** - Sekme butonları için
- **action** - Küçük aksiyon butonları (view, edit, delete)
- **close** - Kapatma butonları için
- **logout** - Çıkış butonları için
- **theme** - Tema değiştirme butonları için
- **icon** - Sadece ikon butonları için

## Boyutlar (size)

```jsx
<Button size="small">Küçük</Button>
<Button size="medium">Orta</Button> {/* varsayılan */}
<Button size="large">Büyük</Button>
```

## Durumlar

```jsx
// Devre dışı
<Button disabled>Devre Dışı</Button>

// Yükleniyor
<Button loading>Yükleniyor...</Button>

// Tip
<Button type="submit">Gönder</Button>
<Button type="button">Buton</Button> {/* varsayılan */}
```

## Örnekler

### Form Butonları

```jsx
<Button type="submit" variant="primary" size="large">
  Kaydet
</Button>

<Button type="button" variant="secondary" onClick={handleCancel}>
  İptal
</Button>
```

### Aksiyon Butonları

```jsx
<Button variant="action" className="btn--view" onClick={handleView}>
  <FaEye />
</Button>

<Button variant="action" className="btn--edit" onClick={handleEdit}>
  <FaEdit />
</Button>

<Button variant="action" className="btn--delete" onClick={handleDelete}>
  <FaTrash />
</Button>
```

### Tab Butonları

```jsx
<Button
  variant="tab"
  className={activeTab === "products" ? "btn--active" : ""}
  onClick={() => setActiveTab("products")}
>
  Ürünlerim
</Button>
```

### Loading State ile

```jsx
<Button variant="primary" loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
</Button>
```

### İkon ile

```jsx
<Button variant="primary">
  <FaPlus /> Yeni Ekle
</Button>
```

## Props

| Prop      | Tip      | Varsayılan | Açıklama            |
| --------- | -------- | ---------- | ------------------- |
| variant   | string   | 'primary'  | Buton variant'ı     |
| size      | string   | 'medium'   | Buton boyutu        |
| type      | string   | 'button'   | HTML buton tipi     |
| disabled  | boolean  | false      | Buton devre dışı mı |
| loading   | boolean  | false      | Yükleniyor durumu   |
| onClick   | function | -          | Tıklama olayı       |
| className | string   | ''         | Ek CSS sınıfları    |
| children  | node     | -          | Buton içeriği       |

## CSS Sınıfları

Kendi stilinizi eklemek için bu sınıfları kullanabilirsiniz:

```css
.btn--custom {
  /* Özel stilleriniz */
}
```

Action butonları için özel sınıflar:

- `.btn--view` - Görüntüleme butonu (mavi)
- `.btn--edit` - Düzenleme butonu (turuncu)
- `.btn--delete` - Silme butonu (kırmızı)

Tab butonları için:

- `.btn--active` - Aktif tab durumu
