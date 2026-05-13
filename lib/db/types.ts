/**
 * AUTO CODE FIX — Database TypeScript types
 * Mirrors the Supabase schema exactly.
 * In production you can replace this with:
 *   npx supabase gen types typescript --project-id <id> > lib/db/types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      obd_codes: {
        Row: {
          id:          number
          code:        string
          name:        string
          cat:         string
          sev:         string
          description: string | null
          causes:      string[]
          symptoms:    string[]
          solutions:   string[]
          diy:         boolean
          avg_cost:    string
          tip:         string | null
          img_url:     string | null
          video_url:   string | null
          created_at:  string
          updated_at:  string
        }
        Insert: Omit<Database['public']['Tables']['obd_codes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['obd_codes']['Insert']>
      }
    }
    Views: {
      category_stats: {
        Row: {
          cat:   string
          total: number
          high:  number
          med:   number
          low:   number
          diy:   number
        }
      }
    }
    Functions: {
      search_obd_codes: {
        Args: { query: string; max_rows?: number }
        Returns: {
          code:        string
          name:        string
          cat:         string
          sev:         string
          description: string | null
          score:       number
        }[]
      }
    }
  }
}

/** Convenience type for a full row */
export type OBDCodeRow = Database['public']['Tables']['obd_codes']['Row']
