import { supabase, type Project, type Message } from "./supabase"

// Projects API
export const projectsApi = {
  // Get all projects with optional filtering
  async getAll(filters?: { category?: string; featured?: boolean }) {
    let query = supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (filters?.category && filters.category !== "all") {
      query = query.eq("category", filters.category)
    }

    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured)
    }

    const { data, error } = await query

    if (error) throw error
    return data as Project[]
  },

  // Get project by ID
  async getById(id: string) {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) throw error
    return data as Project
  },

  // Search projects
  async search(searchTerm: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // Create new project
  async create(project: Omit<Project, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("projects").insert([project]).select().single()

    if (error) throw error
    return data as Project
  },

  // Update project
  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // Delete project
  async delete(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
  },
}

// Messages API
export const messagesApi = {
  // Get all messages
  async getAll(status?: string) {
    let query = supabase.from("messages").select("*").order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) throw error
    return data as Message[]
  },

  // Get message by ID
  async getById(id: string) {
    const { data, error } = await supabase.from("messages").select("*").eq("id", id).single()

    if (error) throw error
    return data as Message
  },

  // Create new message
  async create(message: Omit<Message, "id" | "created_at" | "updated_at" | "status">) {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ ...message, status: "new" }])
      .select()
      .single()

    if (error) throw error
    return data as Message
  },

  // Update message status
  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Message
  },

  // Delete message
  async delete(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id)

    if (error) throw error
  },
}
