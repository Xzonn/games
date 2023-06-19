module Jekyll
  module Hours
    def hours(hours)
      if !hours then
        return ""
      end
      if hours.is_a? Numeric then
        return hours.to_s + "小时"
      end
      return hours
    end
  end
end

Liquid::Template.register_filter(Jekyll::Hours)
