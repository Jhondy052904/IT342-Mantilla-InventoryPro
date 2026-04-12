import { supabase } from '../api/supabase';

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  current_stock: number;
  min_stock_threshold: number;
  category_id: number;
  category: string;
  unit_price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export type ProductPayload = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

/**
 * Fetch all products from the database
 * Orders by created_at descending
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Create a new product
 */
export async function createProduct(payload: ProductPayload): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update an existing product by id
 */
export async function updateProduct(
  id: number,
  payload: Partial<ProductPayload>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete a product by id
 */
export async function deleteProduct(id: number): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
