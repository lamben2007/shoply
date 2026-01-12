
# 📘 Mode opératoire – Trigger automatique `profiles`

## 1️⃣ Pré-requis

* Base Supabase avec Auth activé
* Table `profiles` existante avec la structure recommandée :

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nom text,
  prenom text,
  adresse text,
  created_at timestamptz default now()
);
```

> ⚠️ Important : `profiles.id` doit **être égal à `auth.users.id`**.
> Pas besoin de colonne `userId` séparée.

---

## 2️⃣ Créer la fonction de trigger

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Insert automatique dans profiles avec l'ID du nouvel utilisateur
  insert into public.profiles (id)
  values (new.id);

  return new;
end;
$$;
```

### ✅ Notes importantes

* `security definer` : le trigger fonctionne même avec RLS activée
* `owner = postgres` (à vérifier ou appliquer ensuite)
* `new.id` : fourni automatiquement par PostgreSQL lors de l’insert sur `auth.users`

---

## 3️⃣ Définir le propriétaire de la fonction

```sql
alter function public.handle_new_user() owner to postgres;
```

> Cela garantit que la fonction peut s’exécuter même si l’utilisateur connecté a des permissions limitées.

---

## 4️⃣ Créer le trigger sur `auth.users`

```sql
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
```

### ✅ Vérifications

* Le trigger doit être **appliqué sur `auth.users`** et **non sur une vue**.
* Utilise la requête suivante pour confirmer :

```sql
select tgname, tgrelid::regclass
from pg_trigger
where tgname = 'on_auth_user_created';
```

➡️ Résultat attendu : `auth.users`

---

## 5️⃣ (Optionnel mais recommandé) Activer RLS sur `profiles`

```sql
alter table public.profiles enable row level security;
```

### Politiques RLS simples

* Lecture par le propriétaire :

```sql
create policy "Profiles are readable by owner"
on public.profiles
for select
using (auth.uid() = id);
```

* Mise à jour par le propriétaire :

```sql
create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id);
```

---

## 6️⃣ Test rapide

1. Créer un utilisateur via Supabase Auth (email/password ou OAuth)
2. Vérifier que le profile a été créé automatiquement :

```sql
select *
from public.profiles
order by created_at desc
limit 5;
```

---

## 🔑 Résumé

* Fonction `handle_new_user` → insert automatique
* Trigger `on_auth_user_created` → attaché à `auth.users`
* `security definer` + owner `postgres` → RLS friendly
* `profiles.id = auth.users.id` → cohérence garantie
* Prisma / application → lecture seulement, pas de création manuelle


