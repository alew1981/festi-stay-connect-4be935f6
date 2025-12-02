export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      lite_tbl_city_mapping: {
        Row: {
          country_code: string | null
          created_at: string | null
          id: number
          liteapi_city: string
          notes: string | null
          place_id: string | null
          ticketmaster_city: string
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          id?: number
          liteapi_city: string
          notes?: string | null
          place_id?: string | null
          ticketmaster_city: string
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          id?: number
          liteapi_city?: string
          notes?: string | null
          place_id?: string | null
          ticketmaster_city?: string
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      lite_tbl_event_hotel_prices: {
        Row: {
          adults: number | null
          checkin_date: string
          checkout_date: string
          children: number | null
          currency: string | null
          event_id: string
          fetched_at: string | null
          hotel_id: string
          id: number
          is_available: boolean | null
          min_price: number | null
          nights: number
          suggested_selling_price: number | null
        }
        Insert: {
          adults?: number | null
          checkin_date: string
          checkout_date: string
          children?: number | null
          currency?: string | null
          event_id: string
          fetched_at?: string | null
          hotel_id: string
          id?: number
          is_available?: boolean | null
          min_price?: number | null
          nights: number
          suggested_selling_price?: number | null
        }
        Update: {
          adults?: number | null
          checkin_date?: string
          checkout_date?: string
          children?: number | null
          currency?: string | null
          event_id?: string
          fetched_at?: string | null
          hotel_id?: string
          id?: number
          is_available?: boolean | null
          min_price?: number | null
          nights?: number
          suggested_selling_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "lovable_mv_event_product_page"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_concerts_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_event_hotel_packages"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_events_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_festivals_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "tm_tbl_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "lite_tbl_hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "lovable_mv_event_product_page"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "lite_tbl_event_hotel_prices_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "mv_event_hotel_packages"
            referencedColumns: ["hotel_id"]
          },
        ]
      }
      lite_tbl_facilities: {
        Row: {
          created_at: string | null
          facility_id: number
          facility_name_en: string
          facility_name_es: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          facility_id: number
          facility_name_en: string
          facility_name_es: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          facility_id?: number
          facility_name_en?: string
          facility_name_es?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      lite_tbl_hotel_rooms: {
        Row: {
          created_at: string | null
          description: string | null
          hotel_id: string
          id: number
          main_photo: string | null
          max_adults: number
          max_children: number
          max_occupancy: number
          raw_room_data: Json | null
          room_amenity_ids: number[] | null
          room_name: string
          room_size_square: number | null
          room_size_unit: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          hotel_id: string
          id: number
          main_photo?: string | null
          max_adults: number
          max_children: number
          max_occupancy: number
          raw_room_data?: Json | null
          room_amenity_ids?: number[] | null
          room_name: string
          room_size_square?: number | null
          room_size_unit?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          hotel_id?: string
          id?: number
          main_photo?: string | null
          max_adults?: number
          max_children?: number
          max_occupancy?: number
          raw_room_data?: Json | null
          room_amenity_ids?: number[] | null
          room_name?: string
          room_size_square?: number | null
          room_size_unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lite_tbl_hotel_rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "lite_tbl_hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lite_tbl_hotel_rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "lovable_mv_event_product_page"
            referencedColumns: ["hotel_id"]
          },
          {
            foreignKeyName: "lite_tbl_hotel_rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "mv_event_hotel_packages"
            referencedColumns: ["hotel_id"]
          },
        ]
      }
      lite_tbl_hotels: {
        Row: {
          active: boolean | null
          address: string | null
          cached_min_price: number | null
          cached_price_date: string | null
          chain_id: number | null
          chain_name: string | null
          checkin_time: string | null
          checkout_time: string | null
          child_allowed: boolean | null
          city: string
          country: string | null
          created_at: string | null
          currency: string | null
          deleted_at: string | null
          facility_ids: number[] | null
          hotel_description: string | null
          hotel_important_information: string | null
          hotel_type_id: number | null
          hotel_type_name: string | null
          id: string
          latitude: number | null
          longitude: number | null
          main_photo: string | null
          name: string
          parking_available: boolean | null
          parking_price: number | null
          parking_type: string | null
          pets_allowed: boolean | null
          primary_hotel_id: string | null
          rating: number | null
          raw_hotel_data: Json | null
          raw_images: Json | null
          raw_policies: Json | null
          review_count: number | null
          sentiment_amenities: number | null
          sentiment_cleanliness: number | null
          sentiment_cons: string[] | null
          sentiment_food: number | null
          sentiment_location: number | null
          sentiment_overall: number | null
          sentiment_pros: string[] | null
          sentiment_room_quality: number | null
          sentiment_service: number | null
          sentiment_updated_at: string | null
          sentiment_value: number | null
          slug: string | null
          stars: number | null
          thumbnail: string | null
          ticketmaster_city: string | null
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          cached_min_price?: number | null
          cached_price_date?: string | null
          chain_id?: number | null
          chain_name?: string | null
          checkin_time?: string | null
          checkout_time?: string | null
          child_allowed?: boolean | null
          city: string
          country?: string | null
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          facility_ids?: number[] | null
          hotel_description?: string | null
          hotel_important_information?: string | null
          hotel_type_id?: number | null
          hotel_type_name?: string | null
          id: string
          latitude?: number | null
          longitude?: number | null
          main_photo?: string | null
          name: string
          parking_available?: boolean | null
          parking_price?: number | null
          parking_type?: string | null
          pets_allowed?: boolean | null
          primary_hotel_id?: string | null
          rating?: number | null
          raw_hotel_data?: Json | null
          raw_images?: Json | null
          raw_policies?: Json | null
          review_count?: number | null
          sentiment_amenities?: number | null
          sentiment_cleanliness?: number | null
          sentiment_cons?: string[] | null
          sentiment_food?: number | null
          sentiment_location?: number | null
          sentiment_overall?: number | null
          sentiment_pros?: string[] | null
          sentiment_room_quality?: number | null
          sentiment_service?: number | null
          sentiment_updated_at?: string | null
          sentiment_value?: number | null
          slug?: string | null
          stars?: number | null
          thumbnail?: string | null
          ticketmaster_city?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          cached_min_price?: number | null
          cached_price_date?: string | null
          chain_id?: number | null
          chain_name?: string | null
          checkin_time?: string | null
          checkout_time?: string | null
          child_allowed?: boolean | null
          city?: string
          country?: string | null
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          facility_ids?: number[] | null
          hotel_description?: string | null
          hotel_important_information?: string | null
          hotel_type_id?: number | null
          hotel_type_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          main_photo?: string | null
          name?: string
          parking_available?: boolean | null
          parking_price?: number | null
          parking_type?: string | null
          pets_allowed?: boolean | null
          primary_hotel_id?: string | null
          rating?: number | null
          raw_hotel_data?: Json | null
          raw_images?: Json | null
          raw_policies?: Json | null
          review_count?: number | null
          sentiment_amenities?: number | null
          sentiment_cleanliness?: number | null
          sentiment_cons?: string[] | null
          sentiment_food?: number | null
          sentiment_location?: number | null
          sentiment_overall?: number | null
          sentiment_pros?: string[] | null
          sentiment_room_quality?: number | null
          sentiment_service?: number | null
          sentiment_updated_at?: string | null
          sentiment_value?: number | null
          slug?: string | null
          stars?: number | null
          thumbnail?: string | null
          ticketmaster_city?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      tm_tbl_attractions: {
        Row: {
          created_at: string | null
          event_count: number | null
          id: string
          image_height: number | null
          image_url: string | null
          image_width: number | null
          name: string
          primary_category_id: number | null
          primary_category_name: string | null
          primary_subcategory_id: number | null
          primary_subcategory_name: string | null
          slug: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          event_count?: number | null
          id: string
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          name: string
          primary_category_id?: number | null
          primary_category_name?: string | null
          primary_subcategory_id?: number | null
          primary_subcategory_name?: string | null
          slug?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          event_count?: number | null
          id?: string
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          name?: string
          primary_category_id?: number | null
          primary_category_name?: string | null
          primary_subcategory_id?: number | null
          primary_subcategory_name?: string | null
          slug?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      tm_tbl_event_areas: {
        Row: {
          area_code: string
          area_name: string | null
          created_at: string | null
          event_id: string
          id: number
          price_level_ids: number[] | null
          price_max_excl_fees: number | null
          price_max_incl_fees: number | null
          price_min_excl_fees: number | null
          price_min_incl_fees: number | null
        }
        Insert: {
          area_code: string
          area_name?: string | null
          created_at?: string | null
          event_id: string
          id?: number
          price_level_ids?: number[] | null
          price_max_excl_fees?: number | null
          price_max_incl_fees?: number | null
          price_min_excl_fees?: number | null
          price_min_incl_fees?: number | null
        }
        Update: {
          area_code?: string
          area_name?: string | null
          created_at?: string | null
          event_id?: string
          id?: number
          price_level_ids?: number[] | null
          price_max_excl_fees?: number | null
          price_max_incl_fees?: number | null
          price_min_excl_fees?: number | null
          price_min_incl_fees?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tm_tbl_event_areas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "lovable_mv_event_product_page"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "tm_tbl_event_areas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_concerts_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tm_tbl_event_areas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_event_hotel_packages"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "tm_tbl_event_areas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_events_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tm_tbl_event_areas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "mv_festivals_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tm_tbl_event_areas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "tm_tbl_events"
            referencedColumns: ["id"]
          },
        ]
      }
      tm_tbl_events: {
        Row: {
          attraction_ids: string[] | null
          attraction_names: string[] | null
          cancelled: boolean | null
          categories: Json | null
          created_at: string | null
          currency: string | null
          day_of_week: string | null
          domain: string | null
          door_opening_date: string | null
          event_date: string
          event_type: string | null
          external_url: boolean | null
          id: string
          image_large_height: number | null
          image_large_url: string | null
          image_large_width: number | null
          image_standard_height: number | null
          image_standard_url: string | null
          image_standard_width: number | null
          is_festival: boolean | null
          is_package: boolean | null
          local_event_date: string | null
          minimum_age_required: number | null
          name: string
          off_sale_date: string | null
          on_sale_date: string | null
          price_max_excl_fees: number | null
          price_max_incl_fees: number | null
          price_min_excl_fees: number | null
          price_min_incl_fees: number | null
          primary_attraction_id: string | null
          primary_attraction_name: string | null
          primary_category_id: number | null
          primary_category_name: string | null
          primary_subcategory_id: number | null
          primary_subcategory_name: string | null
          promoter_address_line_1: string | null
          promoter_city: string | null
          promoter_code: string | null
          promoter_country: string | null
          promoter_id: string | null
          promoter_name: string | null
          promoter_postal_code: string | null
          promoter_state: string | null
          raw_event_data: Json | null
          raw_prices_data: Json | null
          rescheduled: boolean | null
          schedule_status: string | null
          seatmap_interactive_detailed: boolean | null
          seatmap_interactive_overview: boolean | null
          seatmap_static: boolean | null
          seats_available: boolean | null
          secondary_attraction_id: string | null
          secondary_attraction_name: string | null
          slug: string | null
          sold_out: boolean | null
          timezone: string | null
          updated_at: string | null
          url: string | null
          venue_address: string | null
          venue_city: string
          venue_country: string | null
          venue_id: string | null
          venue_latitude: number | null
          venue_longitude: number | null
          venue_name: string | null
          venue_postal_code: string | null
          venue_url: string | null
        }
        Insert: {
          attraction_ids?: string[] | null
          attraction_names?: string[] | null
          cancelled?: boolean | null
          categories?: Json | null
          created_at?: string | null
          currency?: string | null
          day_of_week?: string | null
          domain?: string | null
          door_opening_date?: string | null
          event_date: string
          event_type?: string | null
          external_url?: boolean | null
          id: string
          image_large_height?: number | null
          image_large_url?: string | null
          image_large_width?: number | null
          image_standard_height?: number | null
          image_standard_url?: string | null
          image_standard_width?: number | null
          is_festival?: boolean | null
          is_package?: boolean | null
          local_event_date?: string | null
          minimum_age_required?: number | null
          name: string
          off_sale_date?: string | null
          on_sale_date?: string | null
          price_max_excl_fees?: number | null
          price_max_incl_fees?: number | null
          price_min_excl_fees?: number | null
          price_min_incl_fees?: number | null
          primary_attraction_id?: string | null
          primary_attraction_name?: string | null
          primary_category_id?: number | null
          primary_category_name?: string | null
          primary_subcategory_id?: number | null
          primary_subcategory_name?: string | null
          promoter_address_line_1?: string | null
          promoter_city?: string | null
          promoter_code?: string | null
          promoter_country?: string | null
          promoter_id?: string | null
          promoter_name?: string | null
          promoter_postal_code?: string | null
          promoter_state?: string | null
          raw_event_data?: Json | null
          raw_prices_data?: Json | null
          rescheduled?: boolean | null
          schedule_status?: string | null
          seatmap_interactive_detailed?: boolean | null
          seatmap_interactive_overview?: boolean | null
          seatmap_static?: boolean | null
          seats_available?: boolean | null
          secondary_attraction_id?: string | null
          secondary_attraction_name?: string | null
          slug?: string | null
          sold_out?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          url?: string | null
          venue_address?: string | null
          venue_city: string
          venue_country?: string | null
          venue_id?: string | null
          venue_latitude?: number | null
          venue_longitude?: number | null
          venue_name?: string | null
          venue_postal_code?: string | null
          venue_url?: string | null
        }
        Update: {
          attraction_ids?: string[] | null
          attraction_names?: string[] | null
          cancelled?: boolean | null
          categories?: Json | null
          created_at?: string | null
          currency?: string | null
          day_of_week?: string | null
          domain?: string | null
          door_opening_date?: string | null
          event_date?: string
          event_type?: string | null
          external_url?: boolean | null
          id?: string
          image_large_height?: number | null
          image_large_url?: string | null
          image_large_width?: number | null
          image_standard_height?: number | null
          image_standard_url?: string | null
          image_standard_width?: number | null
          is_festival?: boolean | null
          is_package?: boolean | null
          local_event_date?: string | null
          minimum_age_required?: number | null
          name?: string
          off_sale_date?: string | null
          on_sale_date?: string | null
          price_max_excl_fees?: number | null
          price_max_incl_fees?: number | null
          price_min_excl_fees?: number | null
          price_min_incl_fees?: number | null
          primary_attraction_id?: string | null
          primary_attraction_name?: string | null
          primary_category_id?: number | null
          primary_category_name?: string | null
          primary_subcategory_id?: number | null
          primary_subcategory_name?: string | null
          promoter_address_line_1?: string | null
          promoter_city?: string | null
          promoter_code?: string | null
          promoter_country?: string | null
          promoter_id?: string | null
          promoter_name?: string | null
          promoter_postal_code?: string | null
          promoter_state?: string | null
          raw_event_data?: Json | null
          raw_prices_data?: Json | null
          rescheduled?: boolean | null
          schedule_status?: string | null
          seatmap_interactive_detailed?: boolean | null
          seatmap_interactive_overview?: boolean | null
          seatmap_static?: boolean | null
          seats_available?: boolean | null
          secondary_attraction_id?: string | null
          secondary_attraction_name?: string | null
          slug?: string | null
          sold_out?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          url?: string | null
          venue_address?: string | null
          venue_city?: string
          venue_country?: string | null
          venue_id?: string | null
          venue_latitude?: number | null
          venue_longitude?: number | null
          venue_name?: string | null
          venue_postal_code?: string | null
          venue_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      lovable_mv_event_product_page: {
        Row: {
          attraction_names: string[] | null
          cancelled: boolean | null
          checkin_time: string | null
          checkout_time: string | null
          child_allowed: boolean | null
          day_of_week: string | null
          distance_badge: string | null
          distance_km: number | null
          event_badges: string[] | null
          event_created_at: string | null
          event_date: string | null
          event_id: string | null
          event_image_large: string | null
          event_image_standard: string | null
          event_name: string | null
          event_slug: string | null
          event_ticketmaster_url: string | null
          event_type: string | null
          event_updated_at: string | null
          hotel_address: string | null
          hotel_badges: string[] | null
          hotel_chain: string | null
          hotel_city: string | null
          hotel_currency: string | null
          hotel_description: string | null
          hotel_facilities: number[] | null
          hotel_id: string | null
          hotel_important_information: string | null
          hotel_latitude: number | null
          hotel_longitude: number | null
          hotel_main_photo: string | null
          hotel_min_price: number | null
          hotel_name: string | null
          hotel_rating: number | null
          hotel_reviews: number | null
          hotel_selling_price: number | null
          hotel_slug: string | null
          hotel_stars: number | null
          hotel_thumbnail: string | null
          hotel_type: string | null
          hotel_updated_at: string | null
          is_festival: boolean | null
          local_event_date: string | null
          off_sale_date: string | null
          on_sale_date: string | null
          package_adults: number | null
          package_available: boolean | null
          package_checkin: string | null
          package_checkout: string | null
          package_children: number | null
          package_nights: number | null
          parking_available: boolean | null
          parking_price: number | null
          parking_type: string | null
          pets_allowed: boolean | null
          price_updated_at: string | null
          primary_attraction_id: string | null
          primary_attraction_name: string | null
          primary_category_name: string | null
          primary_subcategory_name: string | null
          schedule_status: string | null
          seats_available: boolean | null
          secondary_attraction_id: string | null
          secondary_attraction_name: string | null
          sentiment_amenities: number | null
          sentiment_cleanliness: number | null
          sentiment_cons: string[] | null
          sentiment_food: number | null
          sentiment_location: number | null
          sentiment_overall: number | null
          sentiment_pros: string[] | null
          sentiment_room_quality: number | null
          sentiment_service: number | null
          sentiment_value: number | null
          sold_out: boolean | null
          ticket_areas: Json | null
          ticket_areas_count: number | null
          ticket_currency: string | null
          ticket_price_max: number | null
          ticket_price_min: number | null
          timezone: string | null
          total_package_price: number | null
          venue_address: string | null
          venue_city: string | null
          venue_id: string | null
          venue_latitude: number | null
          venue_longitude: number | null
          venue_name: string | null
          venue_postal_code: string | null
        }
        Relationships: []
      }
      mv_artists_cards: {
        Row: {
          artist_id: string | null
          artist_name: string | null
          artist_slug: string | null
          cities: string[] | null
          event_count: number | null
          genre: string | null
          image_url: string | null
          next_event_date: string | null
          upcoming_events_count: number | null
        }
        Relationships: []
      }
      mv_concerts_cards: {
        Row: {
          artist_name: string | null
          badges: string[] | null
          currency: string | null
          day_of_week: string | null
          event_date: string | null
          genre: string | null
          id: string | null
          image_large_url: string | null
          image_standard_url: string | null
          name: string | null
          price_max_incl_fees: number | null
          price_min_incl_fees: number | null
          slug: string | null
          sold_out: boolean | null
          url: string | null
          venue_city: string | null
          venue_name: string | null
        }
        Relationships: []
      }
      mv_destinations_cards: {
        Row: {
          city_name: string | null
          concerts_count: number | null
          event_count: number | null
          festivals_count: number | null
          genres: string[] | null
          next_event_date: string | null
          price_from: number | null
          price_to: number | null
          sample_image_url: string | null
        }
        Relationships: []
      }
      mv_event_hotel_packages: {
        Row: {
          checkin_date: string | null
          checkout_date: string | null
          distance_km: number | null
          event_city: string | null
          event_date: string | null
          event_id: string | null
          event_image: string | null
          event_name: string | null
          event_price_max: number | null
          event_price_min: number | null
          event_slug: string | null
          hotel_address: string | null
          hotel_city: string | null
          hotel_id: string | null
          hotel_image: string | null
          hotel_lat: number | null
          hotel_lng: number | null
          hotel_name: string | null
          hotel_price: number | null
          hotel_rating: number | null
          hotel_reviews: number | null
          hotel_slug: string | null
          hotel_stars: number | null
          hotel_suggested_price: number | null
          nights: number | null
          package_badges: string[] | null
          package_price_max: number | null
          package_price_min: number | null
          price_updated_at: string | null
          primary_attraction_name: string | null
          venue_name: string | null
        }
        Relationships: []
      }
      mv_events_cards: {
        Row: {
          attraction_names: string[] | null
          badges: string[] | null
          currency: string | null
          day_of_week: string | null
          event_date: string | null
          event_type: string | null
          id: string | null
          image_large_url: string | null
          image_standard_url: string | null
          is_festival: boolean | null
          name: string | null
          price_max_incl_fees: number | null
          price_min_incl_fees: number | null
          primary_attraction_id: string | null
          primary_attraction_name: string | null
          primary_category_name: string | null
          primary_subcategory_name: string | null
          seats_available: boolean | null
          secondary_attraction_name: string | null
          slug: string | null
          sold_out: boolean | null
          url: string | null
          venue_city: string | null
          venue_country: string | null
          venue_name: string | null
        }
        Relationships: []
      }
      mv_festivals_cards: {
        Row: {
          attraction_names: string[] | null
          badges: string[] | null
          currency: string | null
          day_of_week: string | null
          event_date: string | null
          id: string | null
          image_large_url: string | null
          image_standard_url: string | null
          main_attraction: string | null
          name: string | null
          price_max_incl_fees: number | null
          price_min_incl_fees: number | null
          secondary_attraction_name: string | null
          slug: string | null
          sold_out: boolean | null
          url: string | null
          venue_city: string | null
          venue_name: string | null
        }
        Relationships: []
      }
      mv_genres_cards: {
        Row: {
          cities: string[] | null
          event_count: number | null
          genre_id: number | null
          genre_name: string | null
          next_event_date: string | null
          sample_image_url: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_event_badges: {
        Args: {
          p_cancelled: boolean
          p_day_of_week: string
          p_event_date: string
          p_event_type: string
          p_is_package: boolean
          p_minimum_age_required: number
          p_price_max_incl_fees: number
          p_price_min_incl_fees: number
          p_primary_attraction_name: string
          p_primary_subcategory_name: string
          p_rescheduled: boolean
          p_seatmap_interactive_detailed: boolean
          p_seatmap_static: boolean
          p_seats_available: boolean
          p_sold_out: boolean
          p_venue_city: string
        }
        Returns: string[]
      }
      calculate_hotel_nights: {
        Args: { event_date: string }
        Returns: {
          checkin_date: string
          checkout_date: string
          nights: number
        }[]
      }
      earth: { Args: never; Returns: number }
      get_event_badges: { Args: { event_id: string }; Returns: string[] }
      refresh_all_event_views: { Args: never; Returns: undefined }
      refresh_hotel_packages_view: { Args: never; Returns: undefined }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
